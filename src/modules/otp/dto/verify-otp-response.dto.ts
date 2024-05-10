import { IsNotEmpty, IsString } from "class-validator";

export class VerifyOtpResponseDto{
    @IsNotEmpty()
    @IsString()
    message: string;
}