import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Put,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminRole } from './enums/role.enum';
import { AgentService } from './agent.service';
import { AdminAuth, RolesAuth } from '../auth-admin/auth.decorator';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('admin')
@ApiTags('Admin Module')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly agentService: AgentService,
  ) {}

  @AdminAuth()
  @Get('profile')
  async profile(@Request() req) {
    try {
      return await this.adminService.findOne(req.user.id);
    } catch (error) {
      return await this.agentService.findOne(req.user.id);
    }
  }

  @RolesAuth(AdminRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.agentService.findOne(id);
  }

  @RolesAuth(AdminRole.ADMIN)
  @Get()
  @ApiQuery({
    name: 'keyword',
    required: false,
  })
  @ApiQuery({
    name: 'roles',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  async findAll(
    @Query('keyword') keyword: string,
    @Query('roles') roles: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.agentService.findAll(
      { page: page, limit: limit },
      keyword,
      roles,
    );
  }

  @Post('/register')
  @RolesAuth(AdminRole.ADMIN)
  async register(@Body() payload: CreateAgentDto) {
    return await this.agentService.create(payload);
  }

  @RolesAuth(AdminRole.ADMIN)
  @Put('self')
  async updateAdmin(@Body() payload: UpdateAdminDto, @Req() req) {
    return await this.adminService.update(req.user.id, payload);
  }

  @RolesAuth(AdminRole.ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateAgentDto) {
    return await this.agentService.update(id, payload);
  }
}
