import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { JwtPayloadType } from './strategies/jwt-payload.type';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user and generates a JWT access token.
   *
   * This method handles the user registration process, saving the user details to the database,
   * and generating a JWT token for authentication. It logs key actions (e.g., user creation and token generation)
   * at the debug level for detailed tracking and development purposes.
   *
   * @param registerRequestDto - The data for the user to be registered, including first name, last name, and email.
   * @returns An object containing the generated JWT access token and the user ID.
   */
  async register(registerRequestDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const savedUser = await this.usersService.create({
      firstName: registerRequestDto.firstName,
      lastName: registerRequestDto.lastName,
      email: registerRequestDto.email,
    });

    this.logger.debug(`User successfully registered with email: ${savedUser.email}`);

    const payload: JwtPayloadType = {
      id: savedUser.id,
      email: savedUser.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    this.logger.debug(`JWT access token successfully generated for user ID: ${savedUser.id}`);

    return {
      accessToken,
      userId: savedUser.id,
    };
  }
}
