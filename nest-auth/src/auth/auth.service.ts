import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ){}

    async register(email: string, password: string){

        // find the user by email
        const user = await this.userService.getUserByEmail(email);

        if (user){
            throw new BadRequestException("email already in use");
        }

        // generate the salt
        const salt = await bcrypt.genSalt(5);
        // hash the user password
        const hashedPassword =  await bcrypt.hash(password, salt);

        // create a user
        return this.userService.createUser(email, hashedPassword);
    }


    async login(email: string, password: string){

        // find the user by email
        const user = await this.userService.getUserByEmail(email);

        if (!user){

            throw new BadRequestException("user not found");
        }

        
    }
}
