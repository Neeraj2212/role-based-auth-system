import { Roles } from '@/config';
import { IsArray, IsEnum, IsString } from 'class-validator';

export class updatePermissionsDto {
  @IsEnum(Roles)
  public role: Roles;

  @IsArray()
  public permissions: string[];
}

export class updateRolesDto {
  @IsArray()
  public roles: Roles[];
}

export class validateAccessDto {
  @IsString()
  public userId: string;

  @IsString()
  public permission: string;
}
