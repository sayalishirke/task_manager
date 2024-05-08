import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],  
  providers: [TasksService]
})
export class TasksModule {}
