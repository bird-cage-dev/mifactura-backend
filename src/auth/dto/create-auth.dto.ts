import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateAuthDto {
    
    @IsEmail()
    public readonly username: string;
    
    @IsStrongPassword()
    public readonly password: string;
}
