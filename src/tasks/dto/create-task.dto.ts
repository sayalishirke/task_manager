import { IsNotEmpty } from "class-validator"

// for defining shape of the data
export class createTaskDto{
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string
}