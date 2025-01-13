import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';




const roomTypeSchema = new mongoose.Schema({
    type: { type: String, required: true}, // Room type (e.g., Deluxe, Luxury)
    cost: { type: Number, required: true }, // Cost per night for the room type
  });

const hotelSchema = new mongoose.Schema({
    
  name: { type: String, required: true, unique: true },
  id: { type: String, default: uuidv4},
  rooms: [roomTypeSchema], // Array of room types
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true }
});

hotelSchema.index({ id: 1, 'rooms.type': 1 }, { unique: true });

export const Hotel = mongoose.model('Hotel', hotelSchema);
