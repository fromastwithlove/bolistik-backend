import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @Matches(/^[a-zA-Z]+$/, { message: 'First name should only contain letters' })
  firstName?: string;

  @IsOptional()
  @Matches(/^[a-zA-Z]+$/, { message: 'Last name should only contain letters' })
  lastName?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;
}
