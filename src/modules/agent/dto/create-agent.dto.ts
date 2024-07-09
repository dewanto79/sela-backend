import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AdminRole } from 'src/modules/admin/enums/role.enum';

export class CreateAgentDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    enum: AdminRole,
    required: true,
    default: AdminRole.LISTING_AGENT,
  })
  role: AdminRole[];

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    enum: ['active', 'disabled', 'blocked'],
    required: true,
    default: 'active',
  })
  status: string;
}
