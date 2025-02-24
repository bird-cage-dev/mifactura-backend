import { Body, Controller, Get, Param, Post, StreamableFile, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { MongoIdPipe } from 'src/mongo-id/mongo-id.pipe';
import { AuthGuard } from 'src/auth/guard/auth/auth.guard';

@Controller('notification')
export class NotificationController {

  constructor(
    private readonly notificationService: NotificationService,
  ) { }

  @Get('key')
  @UseGuards(AuthGuard)
  getKey() {
    return new StreamableFile(this.notificationService.getKey());
  }

  @Post('subscribe/:userId')
  @UseGuards(AuthGuard)
  public subscribe(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() subscription: CreateSubscriptionDto
  ) {
    return this.notificationService.subscribe(userId, subscription);
  }
}
