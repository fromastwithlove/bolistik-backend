import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'users/dto/user.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor() {}

  private readonly users: UserDto[] = [];

  async register(registerRequestDto: RegisterRequestDto): Promise<UserDto> {
    // Check if the user already exists (based on email in this case)
    const existingUser = this.users.find((user) => user.email === registerRequestDto.email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    // Otherwise, create a new user
    const newUser: UserDto = {
      id: this.users.length + 1,
      firstName: registerRequestDto.firstName,
      lastName: registerRequestDto.lastName,
      email: registerRequestDto.email,
    };

    // Store the new user in our "mock database"
    this.users.push(newUser);
    return newUser;
  }
}
