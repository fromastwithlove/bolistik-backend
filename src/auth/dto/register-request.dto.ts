import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ example: 'Alan', required: false })
  @IsOptional()
  @Matches(/^[a-zA-Z]+$/, { message: 'First name should only contain letters' })
  firstName?: string;

  @ApiProperty({ example: 'Turing', required: false })
  @IsOptional()
  @Matches(/^[a-zA-Z]+$/, { message: 'Last name should only contain letters' })
  lastName?: string;

  @ApiProperty({ example: 'alan.turing@bolistik.kz' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;
}
