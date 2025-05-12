import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { sendNotification } from 'web-push';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  public async getNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async getSubscriptions(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId },
    });
  }

  public async subscribe(userId: string, subscription: CreateSubscriptionDto) {
    return this.prisma.subscription.create({
      data: {
        userId,
        subscription: { ...subscription },
      },
    });
  }

  public async unsubscribe(subscriptionId: string) {
    return this.prisma.subscription.delete({
      where: { id: subscriptionId },
    });
  }

  public async sendPushNotification(subscriptionId: string, notification: CreateNotificationDto) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new BadRequestException(`No existe la suscripción con ID: ${subscriptionId}`);
    }

    try {
      await sendNotification(subscription.subscription, JSON.stringify(notification));

      return await this.prisma.notification.create({
        data: {
          userId: subscription.userId,
          title: notification.title,
          message: notification.body,
        },
      });
    } catch (error) {
      console.error('Error al enviar o guardar la notificación:', error);
      throw new BadRequestException('Error al enviar o guardar la notificación');
    }
  }
}
