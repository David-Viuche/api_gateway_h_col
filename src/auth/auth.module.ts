import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtHandle } from './utils/jwt-handle';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          signOptions: { expiresIn: '4d' },
          secret: process.env.JWT_SECRET,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtHandle, PrismaService],
  exports: [JwtHandle],
})
export class AuthModule { }
