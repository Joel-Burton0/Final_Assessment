import { pool } from "../database/database.js";

export const reservation = async (req, res, next) => {
    let sqlQuery =`
    INSERT INTO reservations
    (Fname,Lname,TRN) VALUES (?,?,?)
    `
    const [reserved] = await pool.query(sqlQuery,
        [req.body.first_name,req.body.last_name,req.body.TRN]
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
