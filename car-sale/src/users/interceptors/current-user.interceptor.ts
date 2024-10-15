import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
} from "@nestjs/common"


import { UsersService } from "../users.service"

@Injectable()
export class CurrentUserIntercetor implements NestInterceptor{
    constructor(private readonly usersService: UsersService){}

    async intercept(context: ExecutionContext, handler: CallHandler<any>) {
        const request = context.switchToHttp().getRequest()
        const {userId} = request.session || {};

        if (userId){
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }

        return handler.handle()
    }
}