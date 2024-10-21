import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto } from './dtos';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @Post("/register")
    registerUser(@Body() body: RegisterUserDto){
        return this.authService.register(body.email, body.password);
    }

    @Post("/login")
    login(@Body() body: LoginUserDto){
        return body.email;
    }

    @Get()
    getProfiles(){
        return this.userService.getAllUsers()
    }
}
