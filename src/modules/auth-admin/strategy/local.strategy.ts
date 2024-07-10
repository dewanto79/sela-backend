import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from 'src/models/entities/admin.entity';
import { AuthAdminService } from '../auth-admin.service';
import { StatusAdmin } from 'src/modules/admin/enums/status-admin.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authAdminService: AuthAdminService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<Admin> {
    const user = await this.authAdminService.getAuthenticatedUser(
      email,
      password,
    );
    if (!user || user.status != StatusAdmin.ACTIVE) {
      throw new UnauthorizedException();
    }
    return user as Admin;
  }
}
