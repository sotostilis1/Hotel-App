import express from 'express';
import { createReservation,getAllCustomerReservations,getAllHotelReservations, getAllReservations, getReservationById, updateReservation, deleteReservation } from '../controllers/reservationsController.js';
import { authMiddleware, adminMiddleware, managerMiddleware, customerMiddleware} from '../middlewares/authMiddleware.js';
import ReservationService from "../services/ReservationService.js"
import HotelService from "../services/HotelService.js"

const router = express.Router();
const reservationService = ReservationService;
const hotelService = HotelService;
router.use(authMiddleware);


router.post('/',customerMiddleware, (req,res) => createReservation(req, res, reservationService));
router.get('/',adminMiddleware, (req,res) => getAllReservations(req, res, reservationService));
router.get('/:id/customers',customerMiddleware, (req,res) => getAllCustomerReservations(req, res, reservationService)); // get all reservations of a particular customer
router.get('/:id/hotels',managerMiddleware, (req,res) => getAllHotelReservations(req, res, reservationService)); // get all reservations for a particular hotel
router.get('/:id',customerMiddleware, (req,res) => getReservationById(req, res, reservationService));
router.patch('/:id',customerMiddleware,(req,res) => updateReservation(req, res, reservationService));
router.delete('/:_id',customerMiddleware,(req,res) => deleteReservation(req, res, reservationService, hotelService));

export default router;