import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Request,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-status.dto';
import { AdminAuth, RolesAuth } from '../auth-admin/auth.decorator';
import { AdminRole } from '../admin/enums/role.enum';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @RolesAuth(AdminRole.ADMIN, AdminRole.LISTING_AGENT)
  @Post()
  async create(@Body() payload: CreatePropertyDto, @Request() req) {
    const userJwt = req.user;
    payload.userId = userJwt.id;
    return await this.propertyService.create(payload);
  }

  @AdminAuth()
  @Get()
  async findAll() {
    return await this.propertyService.findAll();
  }

  @AdminAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.propertyService.findOne(id);
  }

  @RolesAuth(AdminRole.ADMIN, AdminRole.LISTING_AGENT)
  @Put('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() payload: UpdatePropertyStatusDto,
  ) {
    return await this.propertyService.updateStatus(id, payload);
  }
}
