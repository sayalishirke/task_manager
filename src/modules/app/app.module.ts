import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from '../tasks/tasks.module';
import { DatabaseService } from '../../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpModule } from '../otp/otp.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { LoggerService } from 'src/logger.service';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService, 
    }),
    JwtModule.register({
      global: true,
    }),
    TasksModule,
    OtpModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    DatabaseService,
    LoggerService
  ],
  exports: [LoggerService]
})
export class AppModule {}
