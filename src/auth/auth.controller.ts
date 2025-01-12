import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'This endpoint allows a user to register with their details and returns the created user information.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid input.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict, user already exists.',
  })
  register(@Body() registerRequestDto: RegisterRequestDto): Promise<UserDto> {
    return this.authService.register(registerRequestDto);
  }
}
