import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from '../../storage/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,

    // @InjectRepository(User)
    // private readonly customRepo: Repository<User>, 
  ){}

  // findAll() {
  //   return `This action returns all users`;
  // }

  async createUser(email:string, password:string):Promise<User | undefined>{
    try{
        const newUser = new User({email,password})
        await this.entityManager.save(newUser)
        return newUser
    }  
    catch (error){
        throw new Error(error.message)
    }                                                                                                                     
} 

  async findUser(email:string, password: string): Promise<User | undefined> {
    try {
      const user = await this.entityManager.findOne(User,{
        where: {
          email: email,
        }
      })
      if (!user) {
        throw new Error(`User not registered`)
      }
      if (user.password !== password) {
        throw new UnauthorizedException();
      }
      return user
    }
    catch(error){
      throw new Error(error.message)
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
