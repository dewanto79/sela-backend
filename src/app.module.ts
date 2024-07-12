import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthAdminModule } from './modules/auth-admin/auth-admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './database/ormconfig';
import { PropertyModule } from './modules/property/property.module';
import { PropertyApprovalModule } from './modules/property-approval/property-approval.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    HealthcheckModule,
    AdminModule,
    AuthAdminModule,
    PropertyModule,
    PropertyApprovalModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
