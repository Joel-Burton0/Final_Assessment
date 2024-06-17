import { pool } from "../database/database.js";

export const reservation = async (req, res, next) => {
    let sqlQuery =`
    INSERT INTO reservations
    (Fname,Lname,TRN,rentdate,returndate,vehicle_nm,rental_id) VALUES (?,?,?,?,?,?,?)
    `
    const [reserved] = await pool.query(sqlQuery,
        [req.body.Fname,req.body.Lname,req.body.TRN,req.body.rentdate,req.body.returndate,req.body.vehicle_nm,req.body.id]
    );
    
    if(reserved.length <= 0){
        res.status(400).json({
            status:'error',
            message:'Unable to add Reservation'
        })
    }else{
        res.status(201).json({
            status:'success',
            recordId: reserved.insertId
        })
    
    }
}
// Create A Reservation For User
export const makeBooking = async (req, res, _next) => {
    let sqlQuery = `
    INSERT INTO reservations
    ( Fname,Lname, TRN,rentdate,rental_id, returndate,vehicle_nm)
    VALUES (?,?,?,?,?,?)`
    const [reserved] = await pool.query(sqlQuery,
    [ req.body.Fname, req.body.Lname, req.body.id, req.body.TRN,req.body.rentdate, req.body.returndate,req.body.vehicle_nm]
    );
    if(reserved.length <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable to add Reservation'
        })
    }else{
        res.status(201).json({
            status: 'success',
            recordId: reserved.insertId
        })
    }
}
// View a User Reservation
export const viewRentalBooking = async (req, res, _next) =>{
    let sqlQuery = `
    SELECT * FROM reservations
    WHERE id = ?`;
    const [reservation] = await pool.query(sqlQuery, [req.params.id]);
    if(reservation.length <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Not Found'
        });
    }else{
        res.status(200).json({
            status:'success',
            result: reservation.length,
            data: { reservation: reservation[0] }
        });
    }
}
// Get ALL USER RESERVATIONS
export const getallReservations = async (req, res, _next) =>{
    let sqlQuery = `SELECT * FROM reservations`;
    const [reservations] = await pool.query(sqlQuery);
    
    res.status(200).json({
        status: 'success',
        result: reservations.length,
        data: { reservations:reservations }
    });
}
// UPDATE A USER RESERVATION
export const updateBooking = async (req, res, _next) =>{
    let sqlQuery = `
    UPDATE reservations 
    SET  rentdate = ?, returndate = ?
    WHERE id = ?`;
    const [reservation] = await pool.query(sqlQuery,
    [req.body.rentdate, req.body.returndate, req.params.id]
    );
    if(reservation.affectedRows <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable To Update record'
     
        });
    }else{
    res.status(200).json({
            status: 'success',
            affectedRows:  reservation.affectedRows 
        });  
    }
}
// REMOVE A USER RESERVATION
export const deleteReservation = async(req, res, _next) =>{
    const id = req.params.id;
    let sqlQuery = `
    DELETE FROM reservations
    WHERE id = ?`;
   
const [reservation] = await pool.query(sqlQuery, [id]);
    if(reservation.affectedRows <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable To Delete record'
        });
    }else{
    res.status(200).json({
            status: 'success',
            affectedRows:  reservation.affectedRows 
        });  
    }
}