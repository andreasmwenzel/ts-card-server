import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  id: number;

  @Column
  username: string;

  @Column
  password: string;
}
