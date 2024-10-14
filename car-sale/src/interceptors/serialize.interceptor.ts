import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";
import { Observable, map } from "rxjs";
import { plainToInstance } from "class-transformer";

export function Serialize<T>(dto:new () => T){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {

    constructor(private readonly dto: new () => T) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<T> {
        return handler.handle().pipe(
            map((data) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            })
        );
    }
}
