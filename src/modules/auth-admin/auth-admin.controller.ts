import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { LoginAdminDto, LoginGoogle } from './dto/login-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { RolesAuth } from './auth.decorator';
import { AdminRole } from '../admin/enums/role.enum';

@Controller('admin')
@ApiTags('Admin Module')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  // @Post('/')
  // @RolesAuth(AdminRole.ADMIN)
  // async register(@Body() payload: CreateAdminDto) {
  //   return await this.authAdminService.register(payload);
  // }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() body: LoginAdminDto, @Request() req) {
    return await this.authAdminService.generateJwt(req.user);
  }

  @Post('login/google')
  async loginGoogle(@Body() body: LoginGoogle): Promise<any> {
    return await this.authAdminService.ssoGoogle(body);
  }

  // @Put('')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // async update(@Body() payload: UpdateAdminDto, @Request() req) {
  //   return await this.authAdminService.updateAdmin(req.user.id, payload);
  // }
}
