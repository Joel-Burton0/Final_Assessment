import express from 'express';
import { getallReservations, reservation, updateBooking, viewRentalBooking,deleteReservation } from '../controllers/reservationController.js';

export const reserveRouter = express.Router();

reserveRouter.post('/booking',reservation);
reserveRouter.get('/viewbooking/:id',viewRentalBooking);
reserveRouter.get('/allreservation',getallReservations);
reserveRouter.patch('/updatebooking/:id',updateBooking);
reserveRouter.delete('/deletebooking/:id', deleteReservation); 