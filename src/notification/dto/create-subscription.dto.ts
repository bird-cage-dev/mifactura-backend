import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  endpoint: string;

  @IsOptional()
  @IsInt()
  expirationTime?: number;

  @IsObject()
  keys: {
    p256dh: string;
    auth: string;
  };
}
