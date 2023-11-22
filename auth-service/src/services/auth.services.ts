import { SECRET_KEY } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken, Role, TokenData } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
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

  public async getRoles(): Promise<Role[]> {
    const roles: Role[] = await accessModel.find();
    return roles;
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

  public async validateAccess(userId: string, permission: string): Promise<boolean> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');
    if (!isValidObjectId(userId)) throw new HttpException(400, 'UserId is invalid');
    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    return findUser.hasPermission(permission);
  }
}

export default AuthServices;
