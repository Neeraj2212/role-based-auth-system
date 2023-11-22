import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { Roles } from '@/config';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  roles: {
    type: [String],
    enum: Roles,
    default: [Roles.USER],
  },
});

userSchema.post('save', function (error: any, doc: any, next: any) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Username already exists'));
  } else {
    next(error);
  }
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
