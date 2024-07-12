import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApprovalStatus } from '../enums/approval-status.enum';

export class CreatePropertyApprovalDto {
  @IsNotEmpty()
  @ApiProperty({
    enum: ApprovalStatus,
    required: true,
    default: ApprovalStatus.APPROVED,
  })
  @IsEnum(ApprovalStatus)
  status: ApprovalStatus;

  @ApiProperty()
  @IsNotEmpty()
  note: string;

  @ApiHideProperty()
  userId: string;
}
