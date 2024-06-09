import {User} from "../db/models/user";
import kafkaService from './kafkaService';
import {validateOrReject} from "class-validator";
import { CreationAttributes } from 'sequelize/types';

class UserService {
  async createUser(user: CreationAttributes<User>): Promise<User> {
    const newUser = new User(user);
    await validateOrReject(user);
    await newUser.save();

    await kafkaService.sendMessage('user-actions', {
      action: 'create',
      user: newUser
    });

    return newUser;
  }

  async updateUser(id: string, newUser: Partial<User>): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw Object.assign(new Error('User not found'), { status: 404 });
    }

    Object.assign(user, newUser);
    await validateOrReject(user);
    await user.save();

    const updatedUser = await User.findByPk(id);
    if (!updatedUser) {
      throw Object.assign(new Error('User not found'), { status: 404 });
    }

    await kafkaService.sendMessage('user-actions', {
      action: 'update',
      user: updatedUser
    });

    return updatedUser;
  }

  async getUsers(): Promise<User[]> {
    return await User.findAll();
  }
}

export default new UserService();