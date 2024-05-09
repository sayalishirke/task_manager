import { IsNotEmpty, Length, IsNumber } from "class-validator";

export class SendOtpResponseDto{
    @IsNotEmpty()
    @IsNumber()
    @Length(4, 4)
    otp: string;
}