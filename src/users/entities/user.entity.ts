import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    f_name: string

    @Column()
    l_name: string

    @Column()
    emp_id: number

    @Column()
    email: string

    @Column()
    designation: string
}
