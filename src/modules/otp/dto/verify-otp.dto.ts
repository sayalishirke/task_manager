import { IsNotEmpty, IsNumberString, IsString, Length } from "class-validator"

export class VerifyOtpDto{
    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 10, { message: 'Phone number must be 10 digits' })
    phone_no: string

    @IsNotEmpty()
    @IsString()
    @Length(4, 4)
    otp: string
} 