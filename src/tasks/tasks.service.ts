import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
import { EntityManager, Repository } from 'typeorm';
import { GetTaskResponseDto } from './dto/get-task-response.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectEntityManager()
        private taskRepository: EntityManager
    ) { }

    async getAllTasks(): Promise<Task[]> {
        try {
            return await this.taskRepository.find(Task)
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async getTaskById(id: number): Promise<GetTaskResponseDto> {
        try{
            const found = await this.taskRepository.findOne(Task,{ where: { id } })
            if (!found) {
                throw new Error(`Task with id ${id} does not exist`)
            }
            return found 
        }
        catch (error){
            throw new Error(error.message)
        }        
    }    
    
    async createTask(createTaskDto: createTaskDto):Promise<GetTaskResponseDto>{
        const {title, description} = createTaskDto
        try{
            const task = new Task
            task.title = title
            task.description = description
            task.status=TaskStatus.OPEN
            await task.save()
            return task
        }  
        catch (error){
            throw new Error(error.message)
        }                                                                                                                     
    } 
    
    async deleteTask(id:number): Promise<void> {
        try{
            const result = await this.taskRepository.delete(Task,{ id: id})
            if (result.affected === 0){
                throw new NotFoundException(`Task with id ${id} not found`)
            }
        }
        catch(error){
            throw new Error(error.message)
        }
        
    }

        async updateTask(id:number, status: TaskStatus): Promise<void>{
            const result = await this.taskRepository.update(Task, {id: id}, {status: status})
            if (result.affected === 0){
                throw new NotFoundException(`Task with id ${id} not found`)
            }
        }
        

    //     getFilteredTasks(filterDto: GetTaskFilterDto): Task[]{
    //         const {status, search} = filterDto
    //         let filtered_tasks:Task[]=[]
    //         if (status){
    //             filtered_tasks = this.tasks.filter(task => task.status === status)
    //             return filtered_tasks
    //         }
    //         if (search){
    //             filtered_tasks = this.tasks.filter(task=>
    //                 task.title.includes(search) ||
    //                 task.description.includes(search)
    //             )
    //             return filtered_tasks
    //         }
    //         return this.getAllTasks()
    //     }
}


    //     private tasks: Task[] = []

    
    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id)
    //     if (!found) {
    //         throw new NotFoundException()
    //     }
    //     return found
    // }

    // getAllTasks(): Task[] {
    //     return this.tasks
    // }

    
    // deleteTask(id:string): void {
    //     const found = this.getTaskById(id)
    //     this.tasks = this.tasks.filter(task => task.id !== found.id)
    // }

    // updateTask(id:string, status: TaskStatus): Task{
    //     const task = this.getTaskById(id)
    //     task.status = status
    //     return task
    // }

            // createTask(createTaskDto: createTaskDto): Task{
        //     const {title, description} = createTaskDto
        //     const task:Task ={
        //         id: uuidv4(),
        //         title,
        //         description,
        //         status:TaskStatus.OPEN
        //     }
        //     this.tasks.push(task)
        //     return task
        // }
