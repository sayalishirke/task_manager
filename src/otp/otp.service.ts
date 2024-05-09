import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class OtpService {
    private readonly redisClient: Redis.Redis;
    constructor() {
        this.redisClient = new Redis.Redis;
    }

    async setOtp(key: string): Promise<number> {
        const otp = Math.floor(1000 + Math.random() * 9000);
        try {
            await this.redisClient.set(
                key.toString(),
                otp,
                'EX',
                10,
            )
            return otp
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async verifyOtp(key: string, otp: string): Promise<string> {
        try {
            const response = await this.redisClient.get(key);
            if (response === null) {
                throw new Error("Otp expired")
            }
            if (response === otp) {
                return "Otp verification successfull"
            }
            throw new Error("Invalid Otp")
        }
        catch (error){
            throw new Error(error.message)
        }
        
    }
}
