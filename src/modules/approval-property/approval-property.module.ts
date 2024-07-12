import { Module } from '@nestjs/common';
import { ApprovalPropertyService } from './approval-property.service';
import { ApprovalPropertyController } from './approval-property.controller';

@Module({
  controllers: [ApprovalPropertyController],
  providers: [ApprovalPropertyService],
})
export class ApprovalPropertyModule {}
