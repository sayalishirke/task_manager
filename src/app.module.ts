import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    TasksModule
  ],
})
export class AppModule {}
