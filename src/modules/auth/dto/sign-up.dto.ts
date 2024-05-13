import { IsNotEmpty } from "class-validator"

// for defining shape of the data
export class SignUpDto{
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}