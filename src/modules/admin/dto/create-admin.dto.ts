import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AdminRole } from '../enums/role.enum';

export class CreateAdminDto {
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
    default: AdminRole.ADMIN,
  })
  roles: string;

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
