import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.model';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { statusValidationPipe } from './pipes/status-validation.pipe';
// import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Controller('tasks')
@UsePipes(ValidationPipe)
export class TasksController {
    
    constructor(private tasksService: TasksService){}

    // @Get()
    // filterTasks(
    //     @Query() filterTaskDto: GetTaskFilterDto
    // ): Task[] {
    //     if(Object.keys(filterTaskDto).length){
    //         return this.tasksService.getFilteredTasks(filterTaskDto)
    //     }
    //     return this.tasksService.getAllTasks()
    // }

    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks()
    }
    
    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks()
    // }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id:number
    ): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    // @Get('/:id')
    // getTaskById(
    //     @Param('id') id:string
    // ): Task {
    //     return this.tasksService.getTaskById(id)
    // }

    @Post()
    createTask(
        @Body() createTaskDto: createTaskDto
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }
    // @Post()
    // createTask(
    //     @Body() createTaskDto: createTaskDto
    // ): Task {
    //     return this.tasksService.createTask(createTaskDto)
    // }

    @Delete('/:id')
    deleteTaskById(
        @Param('id', ParseIntPipe) id: number,
    ):Promise<void> {
        return this.tasksService.deleteTask(id)
    }
    // @Delete('/:id')
    // deleteTaskById(
    //     @Param('id') id: string
    // ):void {
    //     this.tasksService.deleteTask(id)
    // }

    @Patch('/:id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id:number,
        @Body('status', statusValidationPipe) status:TaskStatus): string {
            this.tasksService.updateTask(id, status)
            return ("Task status updated successfully")
    }
    // @Patch('/:id/status')
    // updateStatus(
    //     @Param('id') id:string,
    //     @Body('status', statusValidationPipe) status:TaskStatus): Task{
    //         return this.tasksService.updateTask(id, status)
    // }

    

    
}
