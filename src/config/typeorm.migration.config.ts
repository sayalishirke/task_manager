import { ConfigService } from "@nestjs/config";
// import { Task } from "./modules/src/tasks/task.entity";
import { DataSource } from "typeorm";

const configService = new ConfigService()
export default new DataSource({
    type : 'postgres',
    host: configService.getOrThrow<string>('POSTGRES_HOST'),
    port: configService.getOrThrow<number>('POSTGRES_PORT'),
    username: configService.getOrThrow<string>('POSTGRES_USER'),
    password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
    database: configService.getOrThrow<string>('POSTGRES_DATABASE'),
    // entities: [Task],
    migrations: ["migrations/**"]
})