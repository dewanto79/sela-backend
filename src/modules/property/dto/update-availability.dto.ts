import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateAvailabilityDto {
  @ApiProperty({ default: true })
  @IsNotEmpty()
  @IsBoolean()
  availability: boolean;

  @ApiHideProperty()
  userId: string;
}
