import { SECRET_KEY } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { TokenData, User, DataStoredInToken } from '@/interfaces/users.interface';
import userModel from '@/models/users.model';
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
}

export default AuthServices;
