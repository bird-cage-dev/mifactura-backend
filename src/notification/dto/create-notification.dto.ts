import { IsString } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    public readonly title: string;

    @IsString()
    public readonly body: string;
}
