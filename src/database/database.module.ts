import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useFactory: (ConfigService: ConfigService)=>({
                type: 'postgres',
                host: ConfigService.getOrThrow('POSTGRES_HOST'),
                port: ConfigService.getOrThrow('POSTGRES_PORT'),
                database: ConfigService.getOrThrow('POSTGRES_DATABASE'),
                username: ConfigService.getOrThrow('POSTGRES_USER'),
                password: ConfigService.getOrThrow('POSTGRES_PASSWORD'),
                autoLoadEntities: true,
                synchronize: ConfigService.getOrThrow('SYNCHRONIZE')
            }),
            inject: [ConfigService]
        }),
    ]
})
export class DatabaseModule {}
