import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

// export type User = {
//   username: string;
//   password: string;
//   userId: number;
//   role: Role;
// };

// export enum Role {
//   BASIC = 'basic',
//   ADMIN = 'admin',
//   MOD = 'mod',
// }

// export type UserPayload = {
//   username: string;
//   id: number;
//   role: Role;
// };

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  // private readonly users: User[] = [
  //   {
  //     userId: 1,
  //     username: 'joe',
  //     password: 'pizza1',
  //     role: Role.BASIC,
  //   },
  //   {
  //     userId: 2,
  //     username: 'julie',
  //     password: 'pizza2',
  //     role: Role.BASIC,
  //   },
  //   {
  //     userId: 3,
  //     username: 'jerry',
  //     password: 'pizza3',
  //     role: Role.ADMIN,
  //   },
  //   {
  //     userId: 4,
  //     username: 'jess',
  //     password: 'pizza4',
  //     role: Role.ADMIN,
  //   },
  //   {
  //     userId: 5,
  //     username: 'jim',
  //     password: 'pizza5',
  //     role: Role.MOD,
  //   },
  // ];
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;

    return user.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        username,
      },
    });
  }
}
