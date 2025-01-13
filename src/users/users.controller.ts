import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user by ID',
    description:
      'Fetches a user by their unique identifier. Returns the user details if found, otherwise throws a not found exception.',
  })
  @ApiOkResponse({ description: 'User found and returned successfully', type: UserDto })
  @ApiNotFoundResponse({ description: 'User with the specified ID was not found' })
  @ApiParam({ name: 'id', type: Number, required: true, description: 'Unique identifier of the user' })
  async findOne(@Param('id') id: number): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
