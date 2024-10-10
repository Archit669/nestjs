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