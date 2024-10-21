import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'archit669',
      signOptions: {expiresIn: '10h'}
    }),
    forwardRef(()=> UserModule)
  ],
  providers: [AuthService],
  exports: [AuthService]
})

export class AuthModule {}
