import {pool} from '../database/database.js';

// Security import
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


const conn = pool;

/**
 * @description - Function to create the JWT Token based on some inputs
 * @param user - The user object from database
 */

function signJWTToken(user){
    return JWT.sign({
        id: user.id, 
        role: user.role}, 
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}
async function userExist(email){
    let sqlQuery = `SELECT* FROM users WHERE email = ?`;
    const [user] = await conn.query(sqlQuery,[email]);
    if (user.length > 0){
        return true;
    }else{
        return false;
    }
}

export const registerUser = async (req, res, _next) =>{
    const {email,password,role,first_nm,last_nm,confirmps} =req.body;
    if(await userExist(email)){
        return res.status(404).json({
            status: 'error',
            message: 'User already exist.'
        });
    }
    const sqlQuery=`
    INSERT INTO users (first_nm ,last_nm ,email,role, last_login, password,confirmps)
    VALUES (? ,? ,?, ?, ? ,?,?)
    `;

    const data = req.body;
    const vRole = 'USER';
    const vStatus = "ACTV";
    const vDate = new Date();

    data.password = await bcrypt.hashSync(data.password);
    data.confirmps = await bcrypt.hashSync(data.confirmps);

    const [result] = await conn.query(sqlQuery, [data.first_nm, data.last_nm, data.email, vRole, vDate, data.password, data.confirmps]);
    
    if(result.insertId > 0){
        const token = signJWTToken({id: result.insertId, role: vRole });
        data.password = undefined
        res.status(201).json({
            status: 'success',
            data: {
                token,
                user: data,
            }
        });
    }else{
        res.status(404).json({
            status: 'error',
            message: 'Error during registration.'
        }); 
    }
}

export const loginUser = async (req, res) =>{
    const {email, password} = req.body;

    let sqlQuery =`SELECT * FROM users WHERE email = ?`;

    const [user] =await conn.query(sqlQuery,
       [
        email
    ]
    );

    if(!user.length){
        return res.status(404).json({
            status: 'error',
            message: 'User not found',
    });
}
    if(!(await bcrypt.compare(password, user[0].password))){
        return res.status(400).json({
            status: 'error',
            message: 'Invalid user credentials'
    });
}
const token = signJWTToken({id: user[0].id ,email: email, role: user[0].role});

user[0].password = undefined;
user[0].confirmps = undefined;

res.status(200).json({
    status: 'success',
    data: {
        token,
        user: user[0],
}
});
    await conn.query(`
        UPDATE users 
        SET last_login = CURRENT_TIMESTAMP()
        WHERE ID = ?`,
        [user[0].id]);

};

export const protect = async(req, res, next) =>{
    const authorization = req.get('Authorization');
    if(!authorization?.startsWith('Bearer'))
        return next(
                res.status(400).json({
                    status: 'error',
                    message: 'Not Authorized'
            })
        );
    const token = authorization.split(' ')[1];
    try{
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log(` DECODED TOKEN: ${JSON.stringify(decoded)}`);
        const [user] = await conn.query(`SELECT * FROM users WHERE id = ? AND status = 'ACTV'`,[decoded.id]);
        if(!user.length)
            return next( 
                    res.status(404).json({
                    status: 'error',
                    message: 'This Token is no longer valid'
                })
            )
            console.log(`user[0] ${JSON.stringify(user[0])}`);
        const data =user[0];
        user[0].password = undefined;
        user[0].confirmps = undefined;
        req.user = user[0];

        next();
    }catch(e){
        if(e.message == 'jwt expired'){
            return res.status(400).json({
                    status: 'error',
                    message: 'Token expired'
                });
            
        }
        next();
    }
}
export const getThisUser = async(req, res, next) =>{
    const data = req.user;
    if(!data)
        return next();
    const [user] = await conn.query(`
        SELECT * FROM users WHERE id = ?
        `,[data.id])
    // data.password = undefined;
    // data.confirmps= undefined;
    // let strQuery = `SELECT * FROM users WHERE id = ?`;
    
    // const [user] = await conn.query(strQuery,[data.id]);
    if(!user.length)
        return res.status(404).json({
            status: 'error',
            message: 'Invalid Request'
        });
    
    // next();
    user[0].password= undefined;
    // user[0].confirmps= undefined;
         res.status(200).json({
        status:'success',
        data: {
            user: user[0]
        }
    });
}

export const getAllUsers = async(req, res) =>{
    let sqlQuery = `SELECT * FROM users`;
    const [users] = await conn.query(sqlQuery);
    if(users.length > 0){
        res.status(200).json({ 
        status: 'success',
        results: users.length,
        data:{users}
    });
    }else{
        res.status(404).json({
            status: 'error',
            message: 'No users found'
        });
    }
}