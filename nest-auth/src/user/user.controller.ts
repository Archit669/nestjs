import { Body, Controller, Get, Post, UseGuards , Req} from '@nestjs/common';
import { RegisterUserDto, LoginUserDto } from './dtos';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

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
        return this.authService.login(body.email, body.password);
    }

    @Get()
    getProfiles(){
        return this.userService.getAllUsers()
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req)
    }   
}
