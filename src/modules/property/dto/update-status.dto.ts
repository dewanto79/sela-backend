import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePropertyStatusDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'status should not be empty' })
  status: string;
}
