import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    this.logger.debug('Creating a user: ', createUserDto);
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    this.logger.debug('Finding a user with email: ', email);
    return this.userRepository.findOneBy({ email });
  }
}
