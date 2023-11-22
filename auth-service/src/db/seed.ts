import { Permissions, Roles } from '@/config';
import accessModel from '@/models/access.model';
import userModel from '@/models/users.model';

export async function seedMongo() {
  const admin = await userModel.findOne({ username: 'admin' });
  if (!admin)
    userModel.create({
      username: 'admin',
      name: 'Admin',
      roles: [Roles.ADMIN],
    });

  const adminRole = await accessModel.findOne({ role: Roles.ADMIN });
  if (!adminRole)
    accessModel.create({
      role: Roles.ADMIN,
      permissions: Object.values(Permissions),
    });

  const managerRole = await accessModel.findOne({ role: Roles.MANAGER });
  if (!managerRole)
    accessModel.create({
      role: Roles.MANAGER,
      permissions: [Permissions.CREATE_TASK, Permissions.UPDATE_TASK, Permissions.DELETE_TASK, Permissions.UPDATE_PROFILE],
    });

  const userRole = await accessModel.findOne({ role: Roles.USER });
  if (!userRole)
    accessModel.create({
      role: Roles.USER,
      permissions: [Permissions.READ_TASK, Permissions.UPDATE_PROFILE],
    });
}
