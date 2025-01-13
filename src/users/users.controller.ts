import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User found', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', type: Number, required: true, description: 'Unique id of the user' })
  async findOne(@Param('id') id: number): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
