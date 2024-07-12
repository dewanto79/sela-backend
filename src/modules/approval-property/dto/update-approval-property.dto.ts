import { PartialType } from '@nestjs/swagger';
import { CreateApprovalPropertyDto } from './create-approval-property.dto';

export class UpdateApprovalPropertyDto extends PartialType(CreateApprovalPropertyDto) {}
