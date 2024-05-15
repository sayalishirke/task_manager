import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from '../tasks/tasks.module';
import { DatabaseService } from '../../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpModule } from '../otp/otp.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
// import { logger } from '.../LoggerService';
import { JwtModule } from '@nestjs/jwt';
import { LoggingMiddleware } from 'src/middlewares/logging.middleware';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
// import { RedisOptions } from 'src/config/redis.config';
// import cacheManagerRedisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/interceptor';
import * as redisStore from 'cache-manager-redis-store'
import { RedisClientOptions } from 'redis';
import { RedisConfig } from 'src/config/redis.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService, 
    }),
    JwtModule.register({
      global: true,
    }),
    CacheModule.register({
      useClass: RedisConfig,
      isGlobal: true,
      inject: [ConfigService],
    }),
    // (
    //   // RedisOptions
    //   // {isGlobal: true}
    //   // {ttl : 5, isGlobal: true,
    //   {
    //     store: redisStore,

    //   // Store-specific configuration:
    //   host: 'localhost',
    //   port: 6379,
    //   },
    // ),
      // useFactory: async (redisConfig: RedisConfig) => ({ // Inject RedisConfig
      //   store: redisStore,
      //   config: redisConfig,
      // }),
      // isGlobal: true,
      // inject: [RedisConfig], // Inject RedisConfig dependency
  
    TasksModule,
    OtpModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    DatabaseService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // LoggerService
  ],
  // exports: [LoggerService]
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggingMiddleware)
  //     .forRoutes('cats');
  // }
}
