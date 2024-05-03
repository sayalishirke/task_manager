import { Column, Entity } from "typeorm";

@Entity()
export class User {
    id: number

    @Column
    name: string
    emp_id: number
    email: string
    password: string
    designation: string
}
