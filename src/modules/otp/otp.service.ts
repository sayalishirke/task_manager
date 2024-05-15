import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import * as Redis from 'ioredis';
import { Cache } from 'cache-manager';

@Injectable()
export class OtpService {
    // private readonly redisClient: Redis.Redis;
    constructor(
        private configService: ConfigService,
        @Inject(CACHE_MANAGER) 
        private redisCacheManager: Cache
    ) {
        // this.redisClient = new Redis.Redis;
    }

    async setOtp(key: string): Promise<number> {
        const otp = Math.floor(1000 + Math.random() * 9000);
        try {
            await this.redisCacheManager.set(
                key,
                otp,
                { ttl: this.configService.getOrThrow('REDIS_TTL')}
                // this.configService.getOrThrow('EXPIRY_TIME'),
            )
            return otp
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async verifyOtp(key: string, otp: string): Promise<string> {
        try {
            const response = await this.redisCacheManager.get(key);
            if (response === null) {
                throw new Error("Otp expired")
            }
            if (response === parseInt(otp)) {
                return "Otp verification successfull"
            }
            throw new Error("Invalid Otp")
        }
        catch (error){
            throw new Error(error.message)
        }
    }
}


