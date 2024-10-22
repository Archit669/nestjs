import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private readonly userService: UserService
    ){

        super({
            secretOrKey: 'archit669',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }


    async validate(payload: {id: string, email: string}){
        const {email} = payload;
        const user:User = await this.userService.getUserByEmail(email);

        return user;
    }

}