import { Roles } from '@/config';
import { IsArray, IsEnum } from 'class-validator';

export class updatePermissionsDto {
  @IsEnum(Roles)
  public role: Roles;

  @IsArray()
  public permissions: string[];
}
