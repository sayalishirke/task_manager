import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { EntityManager, Repository } from 'typeorm';
import { GetTaskResponseDto } from './dto/get-task-response.dto';
import { Like } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) { }

    async getAllTasks(): Promise<Task[]> {
        try {
            return await this.taskRepository.find()
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async getTaskById(id: number): Promise<GetTaskResponseDto> {
        try{
            const found = await this.taskRepository.findOneBy({id})
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
        try{
            const task = new Task(createTaskDto)
            await this.entityManager.save(task)
            return task
        }  
        catch (error){
            throw new Error(error.message)
        }                                                                                                                     
    } 
    
    async deleteTask(id:number): Promise<void> {
        try{
            const result = await this.taskRepository.delete(id)
            if (result.affected === 0){
                throw new NotFoundException(`Task with id ${id} not found`)
            }
        }
        catch(error){
            throw new Error(error.message)
        } 
    }

    async updateTask(id:number, status: TaskStatus): Promise<GetTaskResponseDto>{
        try{
            const task = await this.getTaskById(id)
            if (task.status === status){
                throw new Error(`The status of task is already ${task.status}`)
            }
            task.status = status
            await this.entityManager.save(task)
            return task 
        }
        catch (error){
            throw new Error(error.message)
        }
    }
        
    async getFilteredTasks(filterDto: GetTaskFilterDto): Promise<GetTaskResponseDto[] | boolean>{
        const {status, search} = filterDto
        let filtered_tasks:GetTaskResponseDto[]
        if (status && search) {
            filtered_tasks = await this.taskRepository.find({
                where: {
                    status: status,
                    description: Like(`%${search}%`)
                }
            })
        }
        else if (status){
            filtered_tasks = await this.taskRepository.find({where: {status: status}})
        }
        else if (search){
            filtered_tasks = await this.taskRepository.find({
                where:{
                    description: Like(`%${search}%`)
                }                
            })
        }
        else filtered_tasks = await this.getAllTasks()
        
        if(filtered_tasks.length === 0){
            return false
        }
        return filtered_tasks
    }
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
