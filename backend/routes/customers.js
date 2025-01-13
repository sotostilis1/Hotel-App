import express from 'express';
import { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer, getCustomerByUserId } from '../controllers/customersController.js';
import { authMiddleware, adminMiddleware, managerMiddleware, customerMiddleware } from '../middlewares/authMiddleware.js';


import CustomerService from "../services/CustomerService.js"

const router = express.Router();
const customerService = CustomerService;
router.use(authMiddleware);

router.get('/',customerMiddleware, (req,res) => getAllCustomers(req, res, customerService));
router.get('/:id',customerMiddleware, (req,res) => getCustomerById(req, res, customerService));
router.patch('/:id',managerMiddleware, (req,res) => updateCustomer(req, res, customerService));
router.delete('/:id',managerMiddleware, (req,res) => deleteCustomer(req, res, customerService));
router.get('/:userId/user', customerMiddleware,getCustomerByUserId);

export default router;