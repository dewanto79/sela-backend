import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdatePublishedDto {
  @ApiProperty({ default: true })
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;
}
