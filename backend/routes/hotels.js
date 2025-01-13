import express from 'express';
import { createHotel, getAllHotels, getHotelById, updateHotel, deleteHotel } from '../controllers/hotelsController.js';
import { addRoom, deleteRoom, updateRoom,getRoomByType } from '../controllers/roomsController.js';
import HotelService from "../services/HotelService.js"
import { authMiddleware, adminMiddleware, managerMiddleware, customerMiddleware} from '../middlewares/authMiddleware.js';


const router = express.Router();
const hotelService = HotelService;
router.use(authMiddleware);


router.get('/', (req,res) => getAllHotels(req, res, hotelService));
router.post('/',adminMiddleware, (req,res) => createHotel(req, res, hotelService));
router.get('/:id', (req,res) => getHotelById(req, res, hotelService));
router.patch('/:id',adminMiddleware,(req,res) => updateHotel(req, res, hotelService));
router.delete('/:id',adminMiddleware,(req,res) => deleteHotel(req, res, hotelService));

router.get('/:id/rooms',customerMiddleware, getRoomByType);
router.post('/:id/rooms',managerMiddleware,(req,res) => addRoom(req,res,hotelService));      // Add a new room to a hotel
router.patch('/:id/rooms',managerMiddleware,(req,res) => updateRoom(req,res,hotelService)); // Update a room in a hotel
router.delete('/:id/rooms',managerMiddleware,(req,res) => deleteRoom(req,res,hotelService)); // Delete a room from a hotel


export default router;