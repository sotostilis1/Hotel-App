import { Reservation } from '../models/ReservationModel.js';

class ReservationService {
    async createReservation(data) {
        const newReservation = new Reservation(data);
        await newReservation.save();
        return newReservation;
    }

    async findReservationById(id) {
        return Reservation.findOne({ id });
    }

    async deleteReservationById(_id) {
        return Reservation.findOneAndDelete({ _id });
    }

    async updateReservation(id, updateData) {
        return Reservation.findOneAndUpdate({ id }, updateData, { new: true });
    }

    async findReservationsByHotel(hotelId) {
        return Reservation.find({ hotel: hotelId });
      }

      async findReservationsByCustomer(customerId) {
        return Reservation.find({ customer: customerId });
      }

    async findAllReservation() {
        return Reservation.find({});
    }

     calculateNights = (arrival, checkout) => {
        
        // Calculate the difference in milliseconds
        const differenceInMs = checkout - arrival;
      
        // Convert milliseconds to days
        const nights = differenceInMs / (1000 * 60 * 60 * 24);
      
        // Return the number of nights (ensure it's a positive integer)
        return Math.round(nights);
      };
}

export default new ReservationService();