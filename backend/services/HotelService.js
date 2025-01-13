import { Hotel } from '../models/hotelModel.js';

class HotelService {
    async createHotel(data) {
        const newHotel = new Hotel(data);
        await newHotel.save();
        return newHotel;
    }

    async findHotelById(id) {
        return Hotel.findOne({ id });
    }

    async deleteHotelById(id) {
        return Hotel.findOneAndDelete({ id });
    }

    async updateHotel(id, updateData) {
        return Hotel.findOneAndUpdate({ id }, updateData, { new: true });
    }

    async findAllHotel() {
        return Hotel.find({});
    }

    async addRoomToHotel(hotelId, roomData) {
        return Hotel.findOneAndUpdate(
          { id: hotelId },
          { $push: { rooms: roomData } }, // Add a new room
          { new: true } // Return the updated document
        );
      }
    
      async updateRoomInHotel(hotelId, roomType, updatedRoomData) {
        return Hotel.findOneAndUpdate(
          { id: hotelId, 'rooms.type': roomType }, // Match hotel and room by type
          { $set: { 'rooms.$': updatedRoomData } }, // Update the matched room
          { new: true }                          // Return the updated document
        );
      }

      async deleteRoomFromHotel(hotelId, roomType) {
        return Hotel.findOneAndUpdate(
          { id: hotelId },               // Match the hotel by ID
          { $pull: { rooms: { type: roomType } } }, // Remove the room by type
          { new: true }                // Return the updated document
        );
      }

      async syncAvailability(hotelId, roomType, newQuantity) {
        // Find the hotel and room type
        const hotel = await Hotel.findOne({ id: hotelId, 'rooms.type': roomType });
        if (!hotel) {
          throw new Error('Hotel or room type not found');
        }
      
        const room = hotel.rooms.find((room) => room.type === roomType);
      
        // Calculate the current availability count
        const currentCount = room.availability.length;
      
        if (newQuantity > currentCount) {
          // Add additional availability objects
          const additionalAvailability = Array(newQuantity - currentCount).fill({
            isReserved: false,
            arrival_date: null,
            checkout_date: null
          });
      
          room.availability.push(...additionalAvailability);
        } else if (newQuantity < currentCount) {
          // Remove excess availability objects
          room.availability = room.availability.slice(0, newQuantity);
        }
      
        // Save the changes
        await hotel.save();
        return hotel;
      }

      async deleteRoomType(hotelId, roomType) {
        return await Hotel.findOneAndUpdate(
          { id: hotelId }, // Match the hotel by ID
          {
            $pull: { rooms: { type: roomType } } // Remove the room type from the rooms array
          },
          { new: true } // Return the updated hotel document
        );
      }
      
      
      
      
      
}

export default new HotelService();