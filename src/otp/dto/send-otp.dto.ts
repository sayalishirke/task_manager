import { IsNotEmpty, Length, IsNumberString } from "class-validator";

export class SendOtpDto{
    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 10, { message: 'Phone number must be 10 digits' })
    phone_no: string;
}