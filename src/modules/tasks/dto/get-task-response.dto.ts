import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { TaskStatus } from "../tasks.model"

// for defining shape of the data
export class GetTaskResponseDto{

    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus
}