

export const createHotel = async (req, res, HotelService) => {
  try {
    const {name, rooms, phone_number, address, description } = req.body;

    if (!name || !phone_number || !address || !description) {
        return res.status(400).send({ message: 'All fields are required (name, phone number, address, description).' });
    }
    let newHotel;

   if(!rooms){
    const newHotel = await HotelService.createHotel({
      name,
      phone_number,
      address,
      description,
    });
}else{const newHotel = await HotelService.createHotel({
    name,
    rooms, // Array of room types (e.g., [{ type: "Deluxe", quantity: 10, cost: 150 }])
    phone_number,
    address,
    description,
  });}

    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
  } catch (err) {
    res.status(500).json({ message: 'Error creating hotel', error: err.message });
  }
};

export const getAllHotels = async (req, res, HotelService) => {
    try {
      const hotels = await HotelService.findAllHotel(); // Fetch all hotels
      res.status(200).json(hotels);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching hotels', error: err.message });
    }
  };

  export const getHotelById = async (req, res, HotelService) => {
    try {
      const { id } = req.params; // Extract hotel ID from the route
      const hotel = await HotelService.findHotelById(id);
  
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
  
      res.status(200).json(hotel);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching hotel', error: err.message });
    }
  };

  export const updateHotel = async (req, res, HotelService) => {
    try {
      const { id } = req.params; // Extract hotel ID from the route
      const { id: ho, ...dataToUpdate } = req.body;
      const updatedHotel = await HotelService.updateHotel(id, dataToUpdate);
  
  
      if (!updatedHotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
  
      res.status(200).json({ message: 'Hotel updated successfully', hotel: updatedHotel });
    } catch (err) {
      res.status(500).json({ message: 'Error updating hotel', error: err.message });
    }
  };

  export const deleteHotel = async (req, res, HotelService) => {
    try {
      const { id } = req.params; // Extract hotel ID from the route
  
      const deletedHotel = await HotelService.deleteHotelById(id);
  
      if (!deletedHotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
  
      res.status(200).json({ message: 'Hotel deleted successfully', hotel: deletedHotel });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting hotel', error: err.message });
    }
  };
  
