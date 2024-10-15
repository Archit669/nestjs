import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private readonly usersService: UsersService){

    }

    async signup(email: string, password: string){
        // see if email is in user
        const users = await this.usersService.find(email);
        if (users.length){
            throw new BadRequestException('email in use');
        }

        // hash the users password

        // genearte a salt
        const salt = randomBytes(8).toString('hex');
        // join the hashed result and the salt together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');
    

        // create a new user and save it
        const createdUser = this.usersService.create(email, result);


        // return the user
        return createdUser;
    }

    async signin(email: string, password: string){
        const [user] = await this.usersService.find(email);
        if (!user){
            throw new NotFoundException('user not found');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')){
            throw new BadRequestException('bad password');
        }

        return user;
    }
}