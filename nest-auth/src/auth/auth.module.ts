import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'archit669',
      signOptions: {expiresIn: '10h'}
    }),
    forwardRef(()=> UserModule)
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule]
})

export class AuthModule {}
