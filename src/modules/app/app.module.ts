import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from '../tasks/tasks.module';
import { DatabaseService } from '../../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService, 
    }),
    TasksModule,
    OtpModule
  ],
  providers: [
    DatabaseService,
  ]
})
export class AppModule {}
