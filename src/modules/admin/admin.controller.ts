import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { AdminRole } from './enums/role.enum';
import { AgentService } from './agent.service';
import { AdminAuth, RolesAuth } from '../auth-admin/auth.decorator';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

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
  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateAgentDto) {
    return await this.agentService.update(id, payload);
  }
}
