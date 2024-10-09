# Knowledge Base

## Getting Started

  - Install nestjs cli

  ```bash
  npm install -g @nestjs/cli
  ```

  - setup a new nestjs project
  
  ```bash
  nest new <application-name>
  ```


## Application Goals

Store and retrieve messages stored in a plain JSON file.

## Different Routes of the Application

- Request : GET localhost:3000/messages (retrieve a list of all messages) 

  <img src = "./public/img/get-all-messages-route-structure.png">


- Request : POST localhost:3000/messages (create a new message) 

  <img src = "./public/img/create-a-new-message.png">

- Request : GET localhost:3000/messages/:id (retrieve a message with a particular id) 

  <img src = "./public/img/retrieve-a-message-with-id.png">


## High Level Design of Application server

  <img src = "./public/img/HLD_server.png">


## start a development server
  ```bash
    npm run start:dev
  ```

## NEST JS CLI Commands

  - create a module
  ```bash
    nest generate module messages
  ```

  - generate a controller in messsages module at same level as module

  ```bash
    nest generate controller messages/messages --flat
  ```
  <img src = "./public/img/generate-controller.png">



## HTTP Request

![http request png](./public/img/http-requests.png)


## using pipes for validation
![alt text](./public/img/pipes-intro.png)

## Validation pipes
![alt text](./public/img/validation-pipes.png)

## Setting up Automatic Validation
![alt text](./public/img/automatic-validation-steps.png)

- add the code in main.ts to include validation pipe
  ```ts
  import { ValidationPipe } from '@nestjs/common';

  app.useGlobalPipes(
      new ValidationPipe()
  )
  ```

## Data Transfer Objects

![alt text](./public/img/dto-intro.png)


## Add validation rules to the class

- install class-validator and class-transformer library
  ```bash
  npm install class-validator class-transformer
  ```

- example code to create dto
  ```ts
  import { IsString } from "class-validator";

  export class CreateMessageDto{
      @IsString()
      content: string;
  }
  ```

## Behind the scenes of validation

![alt text](./public/img/behind-the-scenes-validation-pipe.png)


## Services and Repositories

![alt text](./public/img/sercvices-vs-repo.png)


## Dependency Injection

### Inversion of control

![alt text](./public/img/inverson-of-control.png)

![alt text](./public/img/inversion-of-control-defination.png)


## why? 

![alt text](./public/img/bad-case.png)
![alt text](./public/img/better-case.png)
![alt text](./public/img/best-case.png)


![alt text](./public/img/why-good-case-is-good.png)

## Nest Dependency injection container/injector

![alt text](./public/img/nest-dependency-injection-container.png)
![alt text](./public/img/dependency-container-flow.png)

