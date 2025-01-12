import { ApiResponseProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UserDto {
  @ApiResponseProperty({
    type: Number,
  })
  @IsInt()
  @Min(1)
  id: number;

  @ApiResponseProperty({
    type: String,
    example: 'Albert',
  })
  @IsString()
  @IsOptional()
  firstName?: string | null;

  @ApiResponseProperty({
    type: String,
    example: 'Einstein',
  })
  @IsString()
  @IsOptional()
  lastName?: string | null;

  @ApiResponseProperty({
    type: String,
    example: 'albert.einstein@bolistik.kz',
  })
  @IsEmail()
  email: string;
}
