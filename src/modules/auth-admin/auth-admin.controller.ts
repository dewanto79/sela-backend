import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAdminDto } from '../admin/dto/update-admin.dto';

@Controller('admin')
@ApiTags('Admin Module')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async register(@Body() payload: CreateAdminDto) {
    return await this.authAdminService.register(payload);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() body: LoginAdminDto, @Request() req) {
    return await this.authAdminService.generateJwt(req.user);
  }

  @Put('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Body() payload: UpdateAdminDto, @Request() req) {
    return await this.authAdminService.updateAdmin(req.user.id, payload);
  }
}
