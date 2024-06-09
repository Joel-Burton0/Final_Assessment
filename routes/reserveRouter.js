import express from 'express';
import { reservation } from '../controllers/reservationController.js';

export const reserveRouter = express.Router();

reserveRouter.post('/booking',reservation);