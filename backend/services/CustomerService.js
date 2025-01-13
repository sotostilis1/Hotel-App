import { Customer } from '../models/customerModel.js';

class CustomerService {
    async createCustomer(data) {
        const newCustomer = new Customer(data);
        await newCustomer.save();
        return newCustomer;
    }

    async findCustomerById(id) {
        return Customer.findOne({ id });
    }

    async deleteCustomerById(id) {
        return Customer.findOneAndDelete({ id });
    }

    async updateCustomer(id, updateData) {
        return Customer.findOneAndUpdate({ id }, updateData, { new: true });
    }

    async findAllCustomer() {
        return Customer.find({});
    }
}

export default new CustomerService();