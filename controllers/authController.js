import {pool} from '../database/database.js';

// Security import
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


const conn = pool;

/**
 * @description - Function to create the JWT Token based on some inputs
 * @param user - The user object from database
 */

function signJWTTokken(user){
    return JWT.sign({
        id: user.id, 
        role: user.role}, 
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}

export const registerUser = async (req, res, _next) =>{
    const sqlQuery=`
    INSERT INTO users (first_nm ,last_nm ,email, role , last_login, password)
    VALUES (? ,? ,?, ?, ? ,?)
    `;

    const data = req.body;
    const vRole = 'USER';
    const vStatus = "ACTV";
    const vDate = new Date();

    data.password = await bcrypt.hashSync(data.password)

    const [result] = await conn.query(sqlQuery, [data. first_nm, data.last_nm, data.email, vRole, vDate, data.password]);
    
    if(result.insertId > 0){
        const token = signJWTTokken({id: result.insertId, role: vRole });
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

export const loginUser = async (req, res, _next) =>{
    const data = req.body;

    const [user] = await conn.query(`
        SELECT * FROM users 
        WHERE email = ?`,
        [data.email])
    ;

    if(!user.length)
        return res.status(404).json({
            status: 'error',
            message: 'User not found',
    });

    if(!user[0].status == 'NACTV')
        return res.status(400).json({
            status: 'error',
            message: 'User not active on the system',
    });

    if(!(await bcrypt.compare(data.password, user[0].password)))
        return res.status(400).json({
            status: 'error',
            message: 'Invalid user credentials'
    });

    await conn.query(`
        UPDATE users 
        SET last_login = CURRENT_TIMESTAMP()
        WHERE ID = ?`,
        [user[0].id]);

        const token = signJWTTokken(user[0]);

        user[0].password = undefined;

        res.status(200).json({
            status: 'success',
            data: {
                token,
                user: user[0],
        }
    });
};

export const protect = async(req, res, _next) =>{
    const authorization = req.get('Authorization');
    console.log(`REQUEST OBJECT ${JSON.stringify(req.headers)}`); 
    console.log(`REQUEST AUTHENTICATION>> ${authorization}`)
    if(!authorization?.startsWith('Bearer'))
        return _next(
                res.status(400).json({
                    status: 'error',
                    message: 'You must be logged in in order to access this feature'
            })
        );
    const token = authorization.split(' ')[1];
    try{
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log(`DECODED TOKEN: ${JSON.stringify(decoded)}`);

        const [user] = await conn.query(`
            SELECT * FROM users
            WHERE id = ?
            AND status = 'ACTV'
        `,[decoded.id]);
        if(!user.length)
            return _next(
                res.status(404).json({
                    status: 'error',
                    message: 'This Token is no longer valid or there is a validation error'
                })
            )
        console.log(`user[0] ${JSON.stringify(user[0])}`); //RECENTLY ADDED!!!
        const data = user[0];
        data.password = undefined;
        // created a user object user on the request
        req.user = data

        _next();
    }catch(error){
        if(error.message == 'jwt expired'){
            return _next(
                res.status(400).json({
                    status: 'error',
                    message: 'Token expired'
                })
            );
        }else if(error.message == 'jwt malformed'){
            return _next(
                res.status(400).json({
                    status: 'error',
                    message: 'Token malformed'
                })
            );
        }else if(error.message == 'invalid token'){
            return _next(
                res.status(400).json({
                    status: 'error',
                    message: 'Token is Invalid'
                })
            );
        } else{
            return _next(
                res.status(400).json({
                    status: 'error',
                    message: 'Unknown error'
                })
            );
        }  
    }
}
export const getAllUsers = async(req, res, _next) =>{
    const data = req.body;
    const [users] = await conn.query(`
    SELECT * FROM users`);
   
    const userData = users;

    userData.forEach(user =>{
        console.log(`EACH USER >> ${JSON.stringify(users)}`)
        user.password = undefined;
    })
    // console.log(`USERS >> ${JSON.stringify(userData)}`)

    res.status(200).json({
        status: 'success',
        data: {
            users: userData,
        }
    });

}
export const getThisUser = async(req, res, _next) =>{
    const data = req.user;
    if(!data)
        return _next();
    // data.password = undefined;
    const [user] = await conn.query(`
    SELECT * FROM users 
    WHERE id = ?
    `, [data.id]);
    if(!user.length)
        return res.status(404).json({
            status: 'error',
            message: 'Invalid Request'
        });
        
    user[0].password = undefined;
    return res.status(200).json({
    status: 'success',
    data:{
        user: user[0]
    }
    });
}