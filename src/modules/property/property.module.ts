import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PropertyGuestService } from './guest/property-guest.service';
import { PropertyGuestController } from './guest/property-guest.controller';

@Module({
  controllers: [PropertyController, PropertyGuestController],
  providers: [PropertyService, PropertyGuestService],
})
export class PropertyModule {}
