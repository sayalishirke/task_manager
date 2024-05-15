import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
// import { LoggerService } from 'src/logger.service';

@Module({
  controllers: [OtpController],
  providers: [
    OtpService, 
    // LoggerService
  ]
})
export class OtpModule {}
