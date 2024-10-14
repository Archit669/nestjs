import {Body, Controller, Get, Param, Post, Query, Delete , Patch, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        return this.userService.create(body.email, body.password);
    }

    
    @Get('/:id')
    async findUser(@Param('id') id: string){
        const user = await this.userService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException("user not found");
        }

        return user;
    }

    
    @Get()
    findAllUsers(@Query('email') email: string){
        return this.userService.find(email);
    }

    @Patch('/:id')
    updateUser(@Body() body:UpdateUserDto, @Param('id') id: string ){
        return this.userService.update(parseInt(id), body);
    }


    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id));
    }
}   
