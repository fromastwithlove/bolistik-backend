import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly users: UserDto[] = [];

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    this.logger.debug('Creating a user: ', createUserDto);

    // Check if the user already exists (based on email in this case)
    const existingUser = this.users.find((user) => user.email === createUserDto.email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    // Otherwise, create a new user
    const newUser: UserDto = {
      id: this.users.length + 1,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
    };

    // Store the new user in our "mock database"
    this.users.push(newUser);
    return newUser;
  }
}
