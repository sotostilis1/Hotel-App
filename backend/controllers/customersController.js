export const createCustomer = async (req, res, CustomerService) => {
    try {
      const {name, ssn, surname, phone_number } = req.body;
  
      if (!name || !phone_number || !ssn || !surname) {
          return res.status(400).send({ message: 'All fields are required (name, ssn, surname, phone_number).' });
      }
      const newCustomer = await CustomerService.createCustomer({ name, ssn, surname, phone_number });
  
      res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
    } catch (err) {
      res.status(500).json({ message: 'Error creating customer', error: err.message });
    }
  };
  
  export const getAllCustomers = async (req, res, CustomerService) => {
      try {
        const customers = await CustomerService.findAllCustomer(); // Fetch all customers
        res.status(200).json(customers);
      } catch (err) {
        res.status(500).json({ message: 'Error fetching customers', error: err.message });
      }
    };
  
    export const getCustomerById = async (req, res, CustomerService) => {
      try {
        const { id } = req.params; // Extract customer ID from the route
        const customer = await CustomerService.findCustomerById(id);
    
        if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
    
        res.status(200).json(customer);
      } catch (err) {
        res.status(500).json({ message: 'Error fetching customer', error: err.message });
      }
    };
  
    export const updateCustomer = async (req, res, CustomerService) => {
      try {
        const { id } = req.params; // Extract customer ID from the route
        const { id: customerId, ...dataToUpdate } = req.body;
        const updatedCustomer = await CustomerService.updateCustomer(id, dataToUpdate);
    
    
        if (!updatedCustomer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
    
        res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
      } catch (err) {
        res.status(500).json({ message: 'Error updating customer', error: err.message });
      }
    };
  
    export const deleteCustomer = async (req, res, CustomerService) => {
      try {
        const { id } = req.params; // Extract customer ID from the route
    
        const deletedCustomer = await CustomerService.deleteCustomerById(id);
    
        if (!deletedCustomer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
    
        res.status(200).json({ message: 'Customer deleted successfully', customer: deletedCustomer });
      } catch (err) {
        res.status(500).json({ message: 'Error deleting customer', error: err.message });
      }
    };
    
    import { Customer } from '../models/customerModel.js';

    export const getCustomerByUserId = async (req, res) => {
      try {
        const { userId } = req.params; // Get the userId from the URL params
    
        // Find the customer by the `user` field
        const customer = await Customer.findOne({ user: userId });
    
        if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
    
        res.status(200).json(customer); // Return the customer object
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving customer', error: error.message });
      }
    };
    
    