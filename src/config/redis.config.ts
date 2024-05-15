import { CacheModuleOptions } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store'

@Injectable()
export class RedisConfig {
    constructor(private readonly configService: ConfigService) {}

    get options(): CacheModuleOptions {
        return {
            store: redisStore,
            host: this.configService.getOrThrow('REDIS_HOST'),
            port: this.configService.getOrThrow('REDIS_PORT'),
            password: this.configService.getOrThrow('REDIS_PASSWORD'), // Optional
        };
    }
}
