import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }
    //     private tasks: Task[] = []

    //     getAllTasks(): Task[] {
    //         return this.tasks
    //     }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne({where: { id }})
        if (!found) {
            throw new NotFoundException()
        }
        return found 
    }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id)
    //     if (!found) {
    //         throw new NotFoundException()
    //     }
    //     return found
    // }
    
    
    async createTask(createTaskDto: createTaskDto):Promise<Task>{
        const {title, description} = createTaskDto

        const task = new Task
        task.title = title
        task.description = description
        task.status=TaskStatus.OPEN
        await task.save()
        return task
    }

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

    //     deleteTask(id:string): void {
    //         const found = this.getTaskById(id)
    //         this.tasks = this.tasks.filter(task => task.id !== found.id)
    //     }

    //     updateTask(id:string, status: TaskStatus): Task{
    //         const task = this.getTaskById(id)
    //         task.status = status
    //         return task
    //     }

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
