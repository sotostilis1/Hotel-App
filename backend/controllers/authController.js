import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/userModel.js';
import { Customer } from '../models/customerModel.js';


dotenv.config();


export const loginUser = async (req, res, userService) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user by username
        const user = await userService.findUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare passwords using bcrypt
        const isPasswordCorrect = await userService.comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set secure cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure only in production
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        // Response with user and customer data
        res.status(200).json({
            message: 'Login successful',
            id:user.id,
            username: user.username,
            role: user.role,
            token: token, // For frontend debugging if needed
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};




export const registerCustomer = async (req, res) => {
    try {
        const { username, password, ssn, name, surname, phone_number } = req.body;

        // Check for existing username or SSN
        const existingUser = await User.findOne({ username });
        const existingCustomer = await Customer.findOne({ ssn });

        if (existingUser || existingCustomer) {
            return res.status(400).json({ message: 'Username or SSN already exists.' });
        }

        // Create User record (password will be hashed automatically)
        const user = new User({
            username,
            password, // Plain text password; bcrypt will hash it
            role: 'customer',
        });
        await user.save();

        // Create Customer record linked to the User
        const customer = new Customer({
            user: user.id,
            ssn,
            name,
            surname,
            phone_number,
        });
        await customer.save();

        res.status(201).json({ message: 'Customer registered successfully', user, customer });
    } catch (error) {
        res.status(500).json({ message: 'Error registering customer', error: error.message });
    }
};


