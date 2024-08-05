import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PropertyGuestService } from './guest/property-guest.service';
import { PropertyGuestController } from './guest/property-guest.controller';
import { PropertyApprovalModule } from '../property-approval/property-approval.module';

@Module({
  imports: [PropertyApprovalModule],
  controllers: [PropertyController, PropertyGuestController],
  providers: [PropertyService, PropertyGuestService],
})
export class PropertyModule {}
