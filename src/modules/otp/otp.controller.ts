import { Controller, Post, Body, BadRequestException, ValidationPipe } from '@nestjs/common';
import { OtpService } from './otp.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SendOtpResponseDto } from './dto/send-otp-response.dto';
import { VerifyOtpResponseDto } from './dto/verify-otp-response.dto';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }

    @Post('sendotp')
    async sendOtp(@Body(new ValidationPipe()) sendOtpDto: SendOtpDto): Promise<SendOtpResponseDto> {
        try {
            const otp = await this.otpService.setOtp(sendOtpDto.phone_no);
            const responseDto: SendOtpResponseDto = {
                otp: otp.toString()
            }
            return responseDto
        }
        catch (error) {
            throw new BadRequestException(`${error}`)
        }
    }

    @Post('verifyotp')
    async verifyOtp(@Body(new ValidationPipe()) verifyOtpDto: VerifyOtpDto): Promise<VerifyOtpResponseDto> {
        try {
            const response = await this.otpService.verifyOtp(verifyOtpDto.phone_no, verifyOtpDto.otp) 
            const verifyOtpResponseDto:VerifyOtpResponseDto={
                message: response
            }  
            return verifyOtpResponseDto
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
