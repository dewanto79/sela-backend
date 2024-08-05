import { Module } from '@nestjs/common';
import { PropertyApprovalService } from './property-approval.service';
import { PropertyApprovalController } from './property-approval.controller';
import { RepositoryModule } from 'src/models/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [PropertyApprovalController],
  providers: [PropertyApprovalService],
  exports: [PropertyApprovalService],
})
export class PropertyApprovalModule {}
