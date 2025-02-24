import { Body, Controller, Get, Param, Post, StreamableFile } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { MongoIdPipe } from 'src/mongo-id/mongo-id.pipe';

@Controller('notification')
export class NotificationController {

  constructor(
    private readonly notificationService: NotificationService,
  ) { }

  @Get('key')
  getKey() {
    return new StreamableFile(this.notificationService.getKey());
  }

  @Post('subscribe/:userId')
  public subscribe(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() subscription: CreateSubscriptionDto
  ) {
    return this.notificationService.subscribe(userId, subscription);
  }
}
