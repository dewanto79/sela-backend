import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth-admin/strategy/jwt.strategy';
import { AdminModule } from '../admin/admin.module';
import { LocalStrategy } from 'src/modules/auth-admin/strategy/local.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, JwtStrategy, LocalStrategy],
  exports: [AuthAdminService],
})
export class AuthAdminModule {}
