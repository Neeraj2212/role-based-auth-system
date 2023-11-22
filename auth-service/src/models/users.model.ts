import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { Roles } from '@/config';
import accessModel from './access.model';

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

userSchema.methods.hasPermission = async function (permission: string) {
  const roles: string[] = this.roles;
  const allAllowedRoles = await accessModel.find({ role: { $in: roles } });
  const allowedPermissions = allAllowedRoles.map(role => role.permissions).flat();
  return allowedPermissions.includes(permission);
};

const userModel = model<User & Document>('User', userSchema);

export default userModel;
