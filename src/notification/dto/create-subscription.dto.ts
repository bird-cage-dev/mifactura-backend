import { IsEmpty, IsInt, IsObject, IsString } from "class-validator";

export class CreateSubscriptionDto {
    @IsString()
    endpoint: string;
    
    @IsEmpty()
    @IsInt()
    expirationTime?: number;

    @IsObject()
    keys: {
        p256dh: string,
        auth: string
    }
}