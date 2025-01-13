import express from 'express';
import { loginUser } from '../controllers/authController.js';
import {registerCustomer} from '../controllers/authController.js';
import UserService from '../services/UserService.js';

const router = express.Router();
const userService = UserService;

router.post('/login', (req, res) =>  loginUser(req, res, userService));
router.post('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the cookie
    res.clearCookie('role');
    res.status(200).json({ message: 'Logout successful' });
  });
router.post('/register_customer',(req,res) => registerCustomer(req,res));
  


export default router;
