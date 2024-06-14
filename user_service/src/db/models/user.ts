import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import {IsString, MinLength} from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: User unique identifier
 *         name:
 *           type: string
 *           description: User name
 *         lastName:
 *           type: string
 *           description: User lastName
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time of user creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time of user last update
 */
@Table
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv4,
    primaryKey: true
  })
  id!: string;

  @IsString()
  @MinLength(2)
  @Column({
    allowNull: false
  })
  name!: string;

  @IsString()
  @Column
  lastName?: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
