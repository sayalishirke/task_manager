import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request, BadRequestException, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<{ access_token: string }> {
    try{
      return await this.authService.signIn(signInDto)
    }
    catch(error){
      throw new BadRequestException(error.message)
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto): Promise<SignUpDto> {
    try{
        return await this.authService.signUp(signUpDto)
    }
    catch (error){
      throw new BadRequestException(error.message)
    }
  }
  
  @UseGuards(AuthenticationGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}