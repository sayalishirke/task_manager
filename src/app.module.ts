import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseService } from './database/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TaskRepository } from './tasks/tasks.repository';
import { Task } from './tasks/task.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRootAsync({
    useClass: DatabaseService, // Use DatabaseService to create TypeORM options
  }),
  TasksModule
  ],
  providers: [DatabaseService]
})
export class AppModule {}
