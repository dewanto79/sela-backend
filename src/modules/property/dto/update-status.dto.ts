import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PropertyStatus } from '../enums/property-status.enum';

export class UpdatePropertyStatusDto {
  @ApiProperty({ default: PropertyStatus.DRAFT })
  @IsNotEmpty()
  @IsEnum(PropertyStatus, {})
  status: PropertyStatus;
}
