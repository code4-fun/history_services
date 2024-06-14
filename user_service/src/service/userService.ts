import {User} from "../db/models/user";
import kafkaProducerService from './kafkaProducerService';
import { validateOrReject, ValidationError } from "class-validator";
import { CreationAttributes } from 'sequelize/types';
import ApiError from "../error/apiError";
import { logClassAndMethod } from "../decorators/logClassAndMethod";

class UserService {
  @logClassAndMethod
  async createUser(user: CreationAttributes<User>): Promise<User> {
    const newUser = new User(user);
    try {
      await validateOrReject(newUser);
    } catch (errors) {
      if (errors instanceof Array && errors[0] instanceof ValidationError) {
        throw ApiError.badRequest('Validation failed', errors);
      }
      throw errors;
    }
    await newUser.save();

    await kafkaProducerService.sendMessage('user-actions', {
      action: 'create',
      user: newUser
    });

    return newUser;
  }

  @logClassAndMethod
  async updateUser(id: string, newUser: Partial<User>): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    Object.assign(user, newUser);
    try {
      await validateOrReject(user);
    } catch (errors) {
      if (errors instanceof Array && errors[0] instanceof ValidationError) {
        throw ApiError.badRequest('Validation failed', errors);
      }
      throw errors;
    }
    await user.save();

    const updatedUser = await User.findByPk(id);
    if (!updatedUser) {
      throw ApiError.notFound('User not found');
    }

    await kafkaProducerService.sendMessage('user-actions', {
      action: 'update',
      user: updatedUser
    });

    return updatedUser;
  }

  @logClassAndMethod
  async getUsers(): Promise<User[]> {
    return await User.findAll();
  }
}

export default new UserService();
