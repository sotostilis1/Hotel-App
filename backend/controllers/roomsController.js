import {Hotel} from '../models/hotelModel.js';

export const addRoom = async (req, res,HotelService) => {
  try {
    const { id } = req.params; // Hotel ID
    const { type, cost } = req.body; // Room details

    if (!type || !cost) {
      return res.status(400).json({ message: 'Type and cost are required.' });
    }

    // Check if the room type already exists in the specified hotel
    const existingHotel = await Hotel.findOne({ id: id, 'rooms.type': type });
    if (existingHotel) {
      return res.status(400).json({ message: 'Room type already exists in this hotel.' });
    }


    const hotel = await HotelService.addRoomToHotel(
      id, // Pass the hotel ID as a string
      { type, cost } // Room data
    );

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found.' });
    }

    res.status(201).json({ message: 'Room added successfully', hotel });
  } catch (err) {
    res.status(500).json({ message: 'Error adding room', error: err.message });
  }
};


  export const updateRoom = async (req, res, HotelService) => {
    try {
      const { id } = req.params; // Hotel ID
      const { type, cost } = req.body; // Room details
  
      if (!type) {
        return res.status(400).json({ message: 'Provide an existing room type' });
      }
  
      // Fetch the current hotel and room data
      const hotel = await HotelService.findHotelById(id);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
  
      const existingRoom = hotel.rooms.find((room) => room.type === type);
      if (!existingRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      // Merge existing values with provided updates
      const dataToUpdate = {
        type,
        cost: cost !== undefined ? cost : existingRoom.cost
      };

      // Update the room
      await HotelService.updateRoomInHotel(id, type, dataToUpdate);

      const updatedHotel = await HotelService.findHotelById(id);
  
      res.status(200).json({ message: 'Room updated successfully', hotel: updatedHotel });
    } catch (err) {
      res.status(500).json({ message: 'Error updating room', error: err.message });
    }
  };
  

  export const deleteRoom = async (req, res,HotelService) => {
    try {
      const { id } = req.params; // Hotel ID
      const { type } = req.body; // Room type to delete
  
      if (!type) {
        return res.status(400).json({ message: 'Room type is required.' });
      }
  
      const updatedHotel = await HotelService.deleteRoomFromHotel(id, type);
  
      if (!updatedHotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      await HotelService.deleteRoomType(id,type);
  
      res.status(200).json({ message: 'Room deleted successfully', hotel: updatedHotel });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting room', error: err.message });
    }
  };

 


export const getRoomByType = async (req, res) => {
  try {
    const { id } = req.params; // Hotel ID from route parameters
    const { type } = req.query; // Room type from query parameters

    if (!type) {
      return res.status(400).json({ message: 'Room type is required.' });
    }

    // Find the hotel by ID and retrieve the specific room by type
    const hotel = await Hotel.findOne({ id });
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found.' });
    }

    const room = hotel.rooms.find((room) => room.type === type);
    if (!room) {
      return res.status(404).json({ message: `Room type '${type}' not found in this hotel.` });
    }

    res.status(200).json({ message: 'Room found successfully', room });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching room details', error: err.message });
  }
};

  
  