import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';

class UserService {
    

    async findUserByUsername(username) {
        return User.findOne({ username });
    }

    async comparePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default new UserService();