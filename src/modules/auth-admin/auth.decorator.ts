import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AdminRole } from '../admin/enums/role.enum';
import { RolesGuard } from 'src/guard/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

export function RolesAuth(...roles: AdminRole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
}

export function AdminAuth() {
  return applyDecorators(
    RolesAuth(
      AdminRole.ADMIN,
      AdminRole.LISTING_AGENT,
      AdminRole.SELLING_AGENT,
    ),
  );
}
