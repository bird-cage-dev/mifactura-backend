import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { BillModule } from './bill/bill.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    CommonModule, 
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    BillModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
