import { Injectable } from '@nestjs/common';
// import { CreateNotificationDto } from './dto/create-notification.dto';
// import { UpdateNotificationDto } from './dto/update-notification.dto';
import { decode } from 'urlsafe-base64';
import { vapidKeys } from '../vapidKeys';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
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
}

