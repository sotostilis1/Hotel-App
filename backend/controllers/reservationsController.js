import {Hotel} from '../models/hotelModel.js'

export const createReservation = async (req, res, ReservationService, HotelService) => {
  try {
    const { hotelId, customerId, roomType, nights, cost, arrival_date, checkout_date } = req.body;

    

    if (!hotelId || !customerId || !roomType || !nights || !cost || !arrival_date || !checkout_date) {
      return res.status(400).send({ message: 'All fields are required (hotelId, customerId, roomType, nights, cost, arrival_date, checkout_date).' });
    }

    const arrival = new Date(arrival_date);
    const checkout = new Date(checkout_date);

    const hotel = await Hotel.findOne({
      id: hotelId
    });

    if (!hotel) {
      return res.status(404).json({ message: `Hotel doesn't exist` });
    }

    // Extract the hotelName
    const hotelName = hotel.name;

    // Find the room with the given roomType
    const room = hotel.rooms.find((r) => r.type === roomType);
    if (!room) {
      return res.status(404).json({ message: `Room type ${roomType} not found in this hotel.` });
    }

    // Create the reservation
    const newRes = await ReservationService.createReservation({
      hotel: hotelId,
      hotelName: hotelName,
      customer: customerId,
      roomType: roomType,
      nights: nights,
      cost: cost,
      arrival_date: arrival,
      checkout_date: checkout,
    });

    res.status(201).json({ message: 'Reservation created successfully', reservation: newRes });
  } catch (err) {
    res.status(500).json({ message: 'Error creating reservation', error: err.message });
  }
};


  export const getAllCustomerReservations = async (req, res,ReservationService) => {
    try{
      const { id } = req.params;
      const reserv = await ReservationService.findReservationsByCustomer(id);
      if(!reserv){
        res.status(404).json({ message: 'No available reservations for this customer' });
      }
      res.status(200).json(reserv);
      }catch(err){
        res.status(500).json({ message: 'Error fetching reservations', error: err.message });
      }
    
  };

  export const getAllHotelReservations = async (req, res, ReservationService) => {
  
    try{
    const { id } = req.params;
    const reserv = await ReservationService.findReservationsByHotel(id);
    if(!reserv){
      res.status(404).json({ message: 'No available reservations for this hotel' });
    }
    res.status(200).json(reserv);
    }catch(err){
      res.status(500).json({ message: 'Error fetching reservations', error: err.message });
    }
    
  };
  
  export const getAllReservations = async (req, res, ReservationService) => {
    try {
      const reserv = await ReservationService.findAllReservation(); // Fetch all hotels
      res.status(200).json(reserv);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching reservations', error: err.message });
    }
  };
    
    
  

  export const getReservationById = async (req, res,ReservationService) => {
    try {
      const { id } = req.params;
      const reserv = await ReservationService.findReservationById(id);
  
      if (!reserv) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      res.status(200).json(reserv);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching reservations', error: err.message });
    }
    
  };
  export const updateReservation = async (req, res,ReservationService) => {
    
  };
  export const deleteReservation = async (req, res, ReservationService, HotelService) => {
    try {
      const { id } = req.params;
  
      // Find the reservation to delete
      const reservation = await ReservationService.findReservationById(id);
  
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      // Delete the reservation
      const deletedReserv = await ReservationService.deleteReservationById(id);
  
      // Find the associated hotel
      const hotel = await HotelService.findHotelById(reservation.hotel);
  
      if (hotel) {
        const room = hotel.rooms.find((r) => r.type === reservation.roomType);
        if (room) {
          // Use the _id field to locate the availability entry
          const availability = room.availability.find((avail) => avail._id.toString() === reservation.room);
  
          if (availability) {
            // Reset availability fields
            availability.isReserved = false;
            availability.arrival_date = null;
            availability.checkout_date = null;
  
            // Save the updated hotel document
            await hotel.save();
          }
        }
      }
  
      res.status(200).json({ message: 'Reservation deleted successfully', reservation: deletedReserv });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting reservation', error: err.message });
    }
  };
  
  