import { IdentificationType } from "@prisma/client";
import {
    IsEnum, IsNumberString, IsOptional, IsPhoneNumber, IsString, Matches, ValidateNested
} from "class-validator";
import { Type } from 'class-transformer';
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";

export class CreateUserDto {
    @IsString()
    public readonly name: string;

    @IsEnum(IdentificationType)
    public readonly identificationType: IdentificationType;

    @IsNumberString({ no_symbols: true })
    public readonly identification: string;

    @IsPhoneNumber()
    public readonly phone: string;

    @IsOptional()
    @Matches(/\.svg$/)
    public readonly profile?: string;

    @ValidateNested()
    @Type(() => CreateAuthDto)
    public readonly auth: CreateAuthDto;
}
