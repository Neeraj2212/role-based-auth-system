import { Roles } from '@/config';
import { CreateUserDto, UpdateUserDto } from '@/dtos/user.dtos';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { isValidObjectId } from 'mongoose';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');
    if (!isValidObjectId(userId)) throw new HttpException(400, 'UserId is invalid');

    const findUser: User = await this.users.findOne({ _id: userId });
    findUser.hasPermission('update:profile');
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const createUserData: User = await this.users.create(userData);

    return createUserData;
  }

  public async updateUser(userId: string, userData: UpdateUserDto, acitveUserId: string): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    if (!isValidObjectId(userId)) throw new HttpException(400, 'UserId is invalid');

    const findUser: User = await this.users.findById(userId);
    if (!findUser) throw new HttpException(404, "User doesn't exist");
    if (findUser.roles.length === 1 && findUser.roles.includes(Roles.USER) && findUser._id.toString() !== acitveUserId) {
      throw new HttpException(403, "You don't have permission to update other user's profile");
    }
    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { $set: userData }, { returnOriginal: false });
    if (!updateUserById) throw new HttpException(404, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');
    if (!isValidObjectId(userId)) throw new HttpException(400, 'UserId is invalid');

    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(404, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
