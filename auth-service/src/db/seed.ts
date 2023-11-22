import { Permissions, Roles } from '@/config';
import accessModel from '@/models/access.model';
import userModel from '@/models/users.model';

export async function seedRedis() {
  const admin = await accessModel.fetch(Roles.ADMIN);
  const manager = await accessModel.fetch(Roles.MANAGER);
  const user = await accessModel.fetch(Roles.USER);

  if (!admin.role)
    accessModel.save(Roles.ADMIN, {
      role: Roles.ADMIN,
      permissions: [
        Permissions.UPDATE_PROFILE,
        Permissions.DELETE_PROFILE,
        Permissions.CREATE_TASK,
        Permissions.READ_TASK,
        Permissions.UPDATE_TASK,
        Permissions.DELETE_TASK,
        Permissions.UPDATE_ROLES,
        Permissions.UPDATE_PERMISSIONS,
      ],
    });

  if (!manager.role)
    accessModel.save(Roles.MANAGER, {
      role: Roles.MANAGER,
      permissions: [Permissions.CREATE_TASK, Permissions.UPDATE_TASK, Permissions.DELETE_TASK, Permissions.UPDATE_PROFILE],
    });

  if (!user.role)
    accessModel.save(Roles.USER, {
      role: Roles.USER,
      permissions: [Permissions.READ_TASK, Permissions.UPDATE_PROFILE],
    });
}

export async function seedMongo() {
  const admin = await userModel.count({ username: 'admin' });
  if (!admin)
    userModel.create({
      username: 'admin',
      password: 'admin',
      role: Roles.ADMIN,
    });
}
