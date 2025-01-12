import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerRequestDto: RegisterRequestDto): Promise<UserDto> {
    const user = await this.usersService.findOneByEmail(registerRequestDto.email);
    if (!user) throw new HttpException('User already exists', HttpStatus.CONFLICT);
    return this.usersService.create({
      firstName: registerRequestDto.firstName,
      lastName: registerRequestDto.lastName,
      email: registerRequestDto.email,
    });
  }
}
