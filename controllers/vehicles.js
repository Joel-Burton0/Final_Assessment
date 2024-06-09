// Connection to the Database
import { pool } from "../database/database.js";
import { getRandomHex } from "../utils/utils.js";


// Function to retrieve all vehicles info from database
export const getfleet = async (req, res, _next) =>{
    let sqlQuery = `SELECT * FROM fleet`;

    const [fleets] = await pool.query(sqlQuery);

    res.status(200).json({
        status: 'success',
        result: fleets.length,
        data: { fleets: fleets }
    });
}

// Function to retrieve one vehicle from the database
export const getvehicle = async (req, res, _next) =>{
    let sqlQuery = `SELECT * FROM fleet WHERE id = ?`;

    const [vehicle] = await pool.query(sqlQuery, [req.params.id]);
    if(vehicle.length <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Record Not found'
        });
    }else{
        res.status(200).json({
            status: 'success',
            result: vehicle.length,
            data: { vehicle: vehicle[0] }
        });
    }
}

// Function to Create a new vehicle File
export const addvehicle = async(req, res, _next) =>{
console.log(req.files)
let sqlQuery = `INSERT INTO fleet (name,description,status,img,price)
                VALUES (?, ?, ?, ?, ?)`;

let image ='';
if(req.files){
    image = `${getRandomHex(8)}_${req.files.img.name}`
}

if(req.files){
    req.files.img.mv('./uploads/'+ image);
}                   
    const [vehicles] = await pool.query(sqlQuery, 
    [req.body.name, req.body.description,req.body.status,image,req.body.price]                                  
    );

    if(vehicles.length <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable To Create record'
        });
    }else{
    res.status(201).json({
        status: 'success',
        recordId: vehicles.insertId 
    });  
}
}

// Function to Edit / Update a Vehicles File
export const updatevehicle = async(req, res, _next) =>{
    let sqlQuery = `UPDATE fleet SET name = ?,description = ?,status = ?,img = ?,price = ?
    WHERE id = ? `;
                
const [vehicle] = await pool.query(sqlQuery, 
    [req.body.name, req.body.description, req.body.status, req.body.img , req.body.price ,req.params.id]
);

if(vehicle.affectedRows <= 0){
    res.status(400).json({
        status: 'error',
        message: 'Unable To Update record'

    });
}else{
res.status(200).json({
    status: 'success',
    affectedRows:  vehicle.affectedRows 
});  
}
}

// Function to Delete a vehicle file
export const deletevehicle = async(req, res, _next) =>{
    const id = req.params.id;
    let sqlQuery = `DELETE FROM fleet WHERE id = ?`;
   
const [vehicle] = await pool.query(sqlQuery, [id]);

if(vehicle.affectedRows <= 0){
    res.status(400).json({
        status: 'error',
        message: 'Unable To Delete record'
    });
}else{
res.status(200).json({
    status: 'success',
    affectedRows:  vehicle.affectedRows 
});  
}
}