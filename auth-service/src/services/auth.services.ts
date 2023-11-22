import { SECRET_KEY } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { Role } from '@/interfaces/auth.interface';
import { TokenData, User, DataStoredInToken } from '@/interfaces/users.interface';
import userModel from '@/models/users.model';
import accessModel from '@/models/access.model';
import { isEmpty } from 'class-validator';
import { sign } from 'jsonwebtoken';
import { isValidObjectId } from 'mongoose';

class AuthServices {
  public users = userModel;

  public async createToken(userId: string): Promise<TokenData> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');
    if (!isValidObjectId(userId)) throw new HttpException(400, 'UserId is invalid');
    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    const dataStoredInToken: DataStoredInToken = { _id: userId };
    const secretKey: string = SECRET_KEY;

    return { token: sign(dataStoredInToken, secretKey, { expiresIn: '1h' }) };
  }

  public async updateUserRoles(userId: string, roles: string[]): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');
    if (!isValidObjectId(userId)) throw new HttpException(400, 'UserId is invalid');
    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    findUser.roles = roles;
    await this.users.updateOne({ _id: userId }, findUser);

    return findUser;
  }

  public async updateRolePermissions(role: string, permissions: string[]): Promise<Role> {
    if (isEmpty(role)) throw new HttpException(400, 'Role is empty');
    const findRole: Role = await accessModel.findOne({ role });
    if (!findRole) throw new HttpException(404, "Role doesn't exist");

    findRole.permissions = permissions;
    await accessModel.updateOne({ role }, findRole);

    return findRole;
  }
}

export default AuthServices;
