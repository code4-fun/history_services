import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { IsString, IsUUID } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     History:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: History unique identifier
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: User unique identifier
 *         action:
 *           type: string
 *           description: Action performed
 *         details:
 *           type: object
 *           description: Details of the action
 */
@Table
export class History extends Model<History> {
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv4,
    primaryKey: true
  })
  id!: string;

  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id!: string;

  @IsString()
  @Column({
    allowNull: false,
  })
  action!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  details!: object;
}
