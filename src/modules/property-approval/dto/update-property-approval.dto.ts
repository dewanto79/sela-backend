import { PartialType } from '@nestjs/swagger';
import { CreatePropertyApprovalDto } from './create-property-approval.dto';

export class UpdatePropertyApprovalDto extends PartialType(
  CreatePropertyApprovalDto,
) {}
