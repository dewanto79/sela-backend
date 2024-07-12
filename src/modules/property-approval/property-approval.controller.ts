import { Controller, Body, Param, Delete, Put, Request } from '@nestjs/common';
import { PropertyApprovalService } from './property-approval.service';
import { UpdatePropertyApprovalDto } from './dto/update-property-approval.dto';
import { RolesAuth } from '../auth-admin/auth.decorator';
import { AdminRole } from '../admin/enums/role.enum';

@Controller('property-approval')
export class PropertyApprovalController {
  constructor(
    private readonly propertyApprovalService: PropertyApprovalService,
  ) {}

  @Put(':propertyId')
  @RolesAuth(AdminRole.ADMIN)
  update(
    @Param('propertyId') propertyId: string,
    @Body() payload: UpdatePropertyApprovalDto,
    @Request() req,
  ) {
    const userJwt = req.user;
    payload.userId = userJwt.id;
    return this.propertyApprovalService.update(propertyId, payload);
  }
}
