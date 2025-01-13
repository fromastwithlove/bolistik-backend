import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  /**
   * Creates a new user and saves it to the database.
   * @param createUserDto - Data transfer object containing user details.
   * @returns The created user.
   */
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    this.logger.log(`Creating a new user with email: ${createUserDto.email}`);
    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);
    this.logger.log(`User created successfully with ID: ${savedUser.id}`);
    return savedUser;
  }

  /**
   * Finds a user by their email.
   * @param email - The email of the user to find.
   * @returns The user if found, otherwise null.
   */
  async findOneByEmail(email: string): Promise<UserDto | null> {
    this.logger.debug(`Searching for a user with email: ${email}`);
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      this.logger.debug(`User found with email: ${email}`);
    } else {
      this.logger.warn(`No user found with email: ${email}`);
    }
    return user;
  }

  /**
   * Finds a user by their ID.
   * @param id - The ID of the user to find.
   * @returns The user if found, otherwise null.
   */
  async findOne(id: number): Promise<UserDto | null> {
    this.logger.debug(`Searching for a user with ID: ${id}`);
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      this.logger.debug(`User found with ID: ${id}`);
    } else {
      this.logger.warn(`No user found with ID: ${id}`);
    }
    return user;
  }
}
