import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public username: string;
}

export class UpdateUserDto {
  @IsString()
  public name: string;
}
