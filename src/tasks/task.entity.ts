import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks.model";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({default: TaskStatus.OPEN})
    status: TaskStatus

    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // createdAt : Date

    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // updatedAt : Date

    constructor(task: Partial<Task>){
        Object.assign(this, task)
    }
}