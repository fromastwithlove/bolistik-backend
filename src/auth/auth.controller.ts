import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AppleAuthService } from './apple/apple-auth.service';
import { AuthService } from './auth.service';
import { AppleCredentialsRequestDto } from './dto/apple-credentials-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly appleAuthService: AppleAuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/oauth/apple')
  @ApiOperation({
    summary: 'Login or register with Apple credentials',
    description:
      'This endpoint allows a user to either log in or register using Apple credentials. If the user does not exist, they will be registered. If they already exist, they will be logged in. It returns the `userId` and `accessToken`.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    type: RegisterResponseDto, // Assuming the response is the same as for registration
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid input.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict, user already exists.',
  })
  async loginWithApple(@Body() credentialsDto: AppleCredentialsRequestDto): Promise<boolean> {
    await this.appleAuthService.decodeAndVerifyAppleJWT(credentialsDto.identityToken);
    return Promise.resolve(true);
  }
}
