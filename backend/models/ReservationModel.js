import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const reservationSchema = new mongoose.Schema({
    id: {type: String,default: uuidv4},
    hotel: { type: String, required: true, ref: 'Hotel' },
    hotelName: { type: String, required: true},
    customer: { type: String, required: true, ref: 'Customer' },
    roomType: { type: String, required: true },
    nights: { type: Number, required: true },
    cost: { type: Number, required: true },
    arrival_date: { type: Date, required: true },
    checkout_date: { type: Date, required: true }
  });
  
  export const Reservation = mongoose.model('Reservation', reservationSchema);
  