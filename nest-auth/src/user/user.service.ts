import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly repo: Repository<User>){}

    createUser(email: string, password: string){
        const userEntity =  this.repo.create({email, password});
        return this.repo.save(userEntity);
    }

    getAllUsers(){
        return this.repo.find();
    }

    getUserByEmail(email: string){
        return this.repo.findOne({where: {email: email}})
    }


}
