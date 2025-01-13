import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'This endpoint allows a user to register with their details and returns the `userId` and `accessToken`. It checks if the user already exists and throws a conflict error if so.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid input.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict, user already exists.',
  })
  register(@Body() registerRequestDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const user = this.usersService.findOneByEmail(registerRequestDto.email);
    if (!user) throw new HttpException('User already exists', HttpStatus.CONFLICT);

    return this.authService.register(registerRequestDto);
  }
}
