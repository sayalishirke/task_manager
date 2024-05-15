import { IsNotEmpty } from "class-validator"

export class CreateUserRespDto {
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    id: number
}