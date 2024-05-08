import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory{
    constructor(private configService: ConfigService){}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
          type: 'postgres',
          host: this.configService.getOrThrow('POSTGRES_HOST'),
          port: this.configService.getOrThrow('POSTGRES_PORT'),
          username: this.configService.getOrThrow('POSTGRES_USER'),
          password: this.configService.getOrThrow('POSTGRES_PASSWORD'),
          database: this.configService.getOrThrow('POSTGRES_DATABASE'),
          autoLoadEntities: true,
          entities: [Task],
          // entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: this.configService.getOrThrow('SYNCHRONIZE') === 'true', // Convert string to boolean
        };
      }
}