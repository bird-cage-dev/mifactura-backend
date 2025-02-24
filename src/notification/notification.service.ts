import { BadRequestException, Injectable } from '@nestjs/common';
// import { CreateNotificationDto } from './dto/create-notification.dto';
// import { UpdateNotificationDto } from './dto/update-notification.dto';
import { decode } from 'urlsafe-base64';
import { vapidKeys } from '../vapidKeys';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { sendNotification } from 'web-push';
import { CreateNotificationDto } from './dto/create-notification.dto';
@Injectable()
export class NotificationService {

  constructor(private prismaService: PrismaService) { }

  public getKey() {
    return decode(vapidKeys.publicKey);
  }

  public async subscribe(userId: string, subscription: CreateSubscriptionDto) {
    return await this.prismaService.subscription.create({
      data: {
        userId,
        subscription: { ...subscription }
      }
    });
  }

  public async unsubscribe(subscriptionId: string) {
    return await this.prismaService.subscription.delete({
      where: {
        id: subscriptionId
      }
    });
  }

  public async sendPushNotification(subscriptionId: string, notification: CreateNotificationDto) {

    const subscription = await this.prismaService.subscription.findUnique({ where: { id: subscriptionId } });
    if (!subscription)
      throw new BadRequestException(`Not exist subscription with id: ${subscriptionId}`);
    try {
      return await sendNotification(subscription.subscription, JSON.stringify(notification))
    } catch (error) {
      return await this.unsubscribe(subscriptionId);
    }
  }
}

