import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: "localhost",
      port: 27017,
      database: 'architAuthDB',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [User],
      synchronize : true
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
