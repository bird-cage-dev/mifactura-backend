import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { MongoIdPipe } from 'src/mongo-id/mongo-id.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }
}
