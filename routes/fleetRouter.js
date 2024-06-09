import express from 'express';
import { getfleet,getvehicle, addvehicle, updatevehicle, deletevehicle } from '../controllers/vehicles.js';

export const fleetRouter = express.Router();

//routing for Assignment table
fleetRouter.get('/getfleet', getfleet);
fleetRouter.get('/getvehicle/:id', getvehicle);
fleetRouter.post('/addvehicle', addvehicle);
fleetRouter.patch('/updatevehicle/:id', updatevehicle);
fleetRouter.delete('/deletevehicle/:id', deletevehicle);