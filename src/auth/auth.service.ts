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
   * Registers a new user and generates an authentication token.
   * @param registerRequestDto - The data needed to register the user.
   * @returns The JWT access token and user ID.
   */
  async register(registerRequestDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    // Create and save the new user
    const savedUser = await this.usersService.create({
      firstName: registerRequestDto.firstName,
      lastName: registerRequestDto.lastName,
      email: registerRequestDto.email,
    });
    // Log user creation details for debugging purposes
    console.log(`User registered with email: ${savedUser.email}`);

    // Prepare the JWT payload
    const payload: JwtPayloadType = {
      id: savedUser.id,
      email: savedUser.email,
    };

    // Generate JWT access token
    const accessToken = await this.jwtService.signAsync(payload);
    // Log token generation for verification
    console.log(`JWT token generated for user ID: ${savedUser.id}`);

    return {
      accessToken,
      userId: savedUser.id,
    };
  }
}
