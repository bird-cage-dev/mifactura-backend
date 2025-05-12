import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { MongoIdPipe } from 'src/mongo-id/mongo-id.pipe';
import { AuthGuard } from 'src/auth/guard/auth/auth.guard';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @Get('key')
  // @UseGuards(AuthGuard)
  // getKey() {
  //   return new StreamableFile(this.notificationService.getKey());
  // }

  @Post('subscribe/:userId')
  @UseGuards(AuthGuard)
  public subscribe(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() subscription: CreateSubscriptionDto,
  ) {
    return this.notificationService.subscribe(userId, subscription);
  }

  @Delete('unsubscribe/:subscriptionId')
  @UseGuards(AuthGuard)
  public unsubscribe(
    @Param('subscriptionId', MongoIdPipe) subscriptionId: string,
  ) {
    return this.notificationService.unsubscribe(subscriptionId);
  }

  @Post('send/:subscriptionId')
  @UseGuards(AuthGuard)
  public sendNotification(
    @Param('subscriptionId', MongoIdPipe) subscriptionId: string,
    @Body() notification: CreateNotificationDto,
  ) {
    return this.notificationService.sendPushNotification(subscriptionId, notification);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
  public getSubscriptions(@Param('userId', MongoIdPipe) userId: string) {
    return this.notificationService.getSubscriptions(userId);
  }

  @Get('sent/:userId')
  @UseGuards(AuthGuard)
  public getSentNotifications(@Param('userId', MongoIdPipe) userId: string) {
    return this.notificationService.getNotifications(userId);
  }
}
