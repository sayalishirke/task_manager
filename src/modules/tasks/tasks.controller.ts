import {
    BadRequestException, 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    ParseIntPipe, 
    Patch, 
    Post, 
    Query, 
    UseGuards, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.model';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { statusValidationPipe } from './pipes/status-validation.pipe';
import { GetTaskResponseDto } from './dto/get-task-response.dto';
import { AuthenticationGuard } from '../auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthenticationGuard)
@UsePipes(ValidationPipe)
export class TasksController {
    
    constructor(private tasksService: TasksService){}

    @Get()
    async filterTasks(
        @Query(new ValidationPipe()) filterTaskDto: GetTaskFilterDto
    ): Promise<GetTaskResponseDto[] | object> {
        try{
            // if(Object.keys(filterTaskDto).length){
            const result = await this.tasksService.getFilteredTasks(filterTaskDto)
            if (typeof(result) === 'boolean'){
                return {"Message": "No records found"}
            }
            return result
            // }
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
        
    }

    // @Get()
    // async getAllTasks(): Promise<GetTaskResponseDto[]> {
    //     try{
    //         return this.tasksService.getAllTasks()
    //     }
    //     catch (error){
    //         throw new BadRequestException(error.message)
    //     }
        
    // }
    
    @Get('/:id')
    async getTaskById(
        @Param('id', ParseIntPipe) id:number
    ): Promise<GetTaskResponseDto> {
        try {
            return await this.tasksService.getTaskById(id)
        }
        catch (error){
            throw new BadRequestException(error.message)
        }        
    }

    @Post()
    async createTask(
        @Body(new ValidationPipe()) createTaskDto: createTaskDto
    ): Promise<GetTaskResponseDto> {
        try{
            return await this.tasksService.createTask(createTaskDto)
        }
        catch (error){
            throw new BadRequestException(error.message)
        }
        
    }    

    @Delete('/:id')
    async deleteTaskById(
        @Param('id', ParseIntPipe) id: number,
    ):Promise<object> {
        try{
            await this.tasksService.deleteTask(id)
            return {"message": "Task deleted successfully"}
        }
        catch (error){
            throw new BadRequestException(error.message)
        }
    }

    @Patch('/:id/status')
    async updateStatus(
        @Param('id', ParseIntPipe) id:number,
        @Body('status', statusValidationPipe) status:TaskStatus): Promise<object> {
            try{
                await this.tasksService.updateTask(id, status)
                return {"message": "Task status updated successfully"}
            }
            catch (error){
                throw new BadRequestException(error.message)
            }
        }
}    




    // @Get()
    // filterTasks(
    //     @Query() filterTaskDto: GetTaskFilterDto
    // ): Task[] {
    //     if(Object.keys(filterTaskDto).length){
    //         return this.tasksService.getFilteredTasks(filterTaskDto)
    //     }
    //     return this.tasksService.getAllTasks()
    // }

    
    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks()
    // }

    // @Get('/:id')
    // getTaskById(
    //     @Param('id') id:string
    // ): Task {
    //     return this.tasksService.getTaskById(id)
    // }

    // @Post()
    // createTask(
    //     @Body() createTaskDto: createTaskDto
    // ): Task {
    //     return this.tasksService.createTask(createTaskDto)
    // }

        // @Delete('/:id')
    // deleteTaskById(
    //     @Param('id') id: string
    // ):void {
    //     this.tasksService.deleteTask(id)
    // }

    // @Patch('/:id/status')
    // updateStatus(
    //     @Param('id') id:string,
    //     @Body('status', statusValidationPipe) status:TaskStatus): Task{
    //         return this.tasksService.updateTask(id, status)
    // }
