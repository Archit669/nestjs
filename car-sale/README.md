# Knowledge Base

## Application Goal

![alt text](./public/img/app-goal.png)

## Method and Routes of the application
![alt text](./public/img/routes-and-methods.png)

## project modules
![alt text](./public/img/project-modules.png)

## Nest cli to generate modules, controllers, services
- note we don't use nest cli to generate repositories
```bash
nest generate module <module_name>
nest generate controller <controller_name>
nest generate service <service_name>
```

## Persistant data with Nest
![alt text](./public/img/orm-intro.png)

## install typeorm
```bash
npm install @nestjs/typeorm typeorm sqlite3
```

## connection with database

![alt text](./public/img/database-conection-intro.png)

## integerate typeorm with nestjs in app.module.ts
```bash
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // type of database
      database: 'db.sqlite', // database name
      entities: [], // entities in database
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


```

## creating an entity
![alt text](./public/img/create-an-entity-instructions.png)


## typeorm repository API
![alt text](./public/img/typeorm-repo-api.png)

## few Extra Routes
![alt text](./public/img/few-extra-routes.png)

## controller and service methods
![alt text](./public/img/controller-and-services-extra-routes.png)

## install dependency class validator and class transformer
``` bash
 npm install class-validator class-transformer
```


## whitelist: true in validation pipes
- This will not allow extra property except the validation rule, if client will send something extra so it will not give error but not allow the extra attributes and value
```ts
 app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
```


## flow of creating user in database
![alt text](./public/img/flow-create-user-in-sqllite.png)

## create vs save
![alt text](./public/img/create-vs-save.png)
- if save is use with entity instance then hooks are executed but if you don't use save with entity , hooks are not executed.


## typeorm findone and find
- Locate the findOne method and update the return to look like this:

  ```ts
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  ``` 

- Locate the find method and update the return to look like this:

  ```ts
  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  ```


## update in database with triggering hooks
![alt text](./public/img/update-with-trigger-hooks.png)

## excluding response properties

- current way to find user

  ![alt text](./public/img/current-way-find-user.png)

- new way to find user (recommended by nestjs)

  ![alt text](./public/img/new-way-to-find-user.png)

  - add exclude decorator in column of entity that we want to exclude

  - then

  ``` ts
  import {UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';

   @UseInterceptors(ClassSerializerInterceptor)
   @Get()
   async <function_name>(){}

  ```


## problem with above approach recommend by nestjs

![alt text](./public/img/old-way-interceptor-problem.png)

## solution
![alt text](./public/img/new-approach-flexible-by-dtos.png)


## authentication from scratch

- auth architecture
![alt text](./public/img/auth-architecture.png)

- user module
![alt text](./public/img/user-module-design.png)

## sessions 
![alt text](./public/img/cookies.png)

``` bash
npm install cookie-session @types/cookie-session
```

```ts
// main.ts
import cookieSession = require('cookie-session');

// inside bootstrap function
app.use(cookieSession({
    keys: ['asdfasdf']
  }))

```


- we can set properties in session 
- we can also retrieve properties from session


## common auth system features

![alt text](./public/img/common-auth-system-features.png)

## create your own custom decorator

```ts
// current-user.decorator.ts
import {
    createParamDecorator,
    ExecutionContext

} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data:never, context: ExecutionContext)=>{
        const request = context.switchToHttp().getRequest();
        return 'hi there';
    }
)

```


## Access userService instance in dependency injection system using current user interceptor
![alt text](./public/img/current-user-interceptor.png)


## CurrentUserInterceptor

```ts
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
```

## CurrentUserDecorator

```ts
import {
    createParamDecorator,
    ExecutionContext

} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data:never, context: ExecutionContext)=>{
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)

```


## create global interceptor

```ts
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserIntercetor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserIntercetor,
    },
  ],
})

```