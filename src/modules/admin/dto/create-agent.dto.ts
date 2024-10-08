import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { RoleAgent } from '../enums/role-agent.enum';
import { StatusAdmin } from '../enums/status-admin.enum';

export class CreateAgentDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsArray()
  @ApiProperty({
    enum: RoleAgent,
    isArray: true,
    required: true,
    default: [RoleAgent.LISTING_AGENT],
  })
  @IsEnum(RoleAgent, { each: true })
  @ArrayNotEmpty()
  roles: RoleAgent[];

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    enum: StatusAdmin,
    required: true,
    default: StatusAdmin.ACTIVE,
  })
  @IsEnum(StatusAdmin)
  status: StatusAdmin;
}
