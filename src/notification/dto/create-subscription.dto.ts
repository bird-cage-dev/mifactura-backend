import { IsEmpty, IsMongoId, IsObject, IsString } from "class-validator";

export class CreateSubscriptionDto {
    @IsString()
    endpoint: string;
    
    @IsEmpty()
    @IsString()
    expirationTime: string;

    @IsObject()
    keys: {
        p256dh: string,
        auth: string
    }
}