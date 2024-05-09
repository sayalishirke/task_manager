// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { RedisModuleOptions } from 'nestjs-redis';

// export const redisConfig = (configService: ConfigService): RedisModuleOptions => {
//   return {
//       host: '127.0.0.1',
//       port: 6379
//   }
// };

import { ConfigService } from '@nestjs/config';
import { RedisModuleOptions } from 'nestjs-redis';

export const redisConfig = (configService: ConfigService): RedisModuleOptions => ({
    host: configService.get('REDIS_HOST'),
    port: configService.get<number>('REDIS_PORT'),
});
