import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthAdminModule } from './modules/auth-admin/auth-admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './database/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    HealthcheckModule,
    AdminModule,
    AuthAdminModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
