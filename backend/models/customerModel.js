
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const customerSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    user: { type: String, required: true, ref: 'User' },
    ssn: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone_number: { type: String, required: true },
});

export const Customer = mongoose.model('Customer', customerSchema);

  