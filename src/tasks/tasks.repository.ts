import { DataSource, EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";

export class TaskRepository extends Repository<Task>{
    constructor(private dataSource: DataSource){
        super(Task, dataSource.createEntityManager())
    }
}