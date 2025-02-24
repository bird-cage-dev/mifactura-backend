import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { MongoIdPipe } from 'src/mongo-id/mongo-id.pipe';
import { AuthGuard } from 'src/auth/guard/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }
}
