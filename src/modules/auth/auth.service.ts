
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from 'src/storage/user.entity';
import { EntityManager } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(

    @InjectEntityManager()
    private readonly newentityManager: EntityManager,
    private readonly newjwtService: JwtService,
    private readonly newconfigService: ConfigService,
    private readonly userService: UsersService,

  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findUser(signInDto.email, signInDto.password)
      if (!user) {
        throw new Error(`User not registered`)
      }
      if (user.password !== signInDto.password) {
        throw new UnauthorizedException();
      }
      const payload = { email: user.email, id: user.id }
      return {
        access_token: await this.newjwtService.signAsync(
          payload,
          {
            expiresIn: this.newconfigService.getOrThrow('JWT_EXPIRY_TIME'),
            secret: this.newconfigService.getOrThrow('JWT_SECRET')
          })
      }
    }
    catch (error) {
      throw new Error(error.message)
    }
    
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpDto> {
    try {
      const newUser = await this.userService.createUser(signUpDto.email, signUpDto.password)
      return newUser
    }
    catch (error) {
      throw new Error(error.message)
    }
   }

}