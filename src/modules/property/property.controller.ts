import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Request,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-status.dto';
import { AdminAuth, RolesAuth } from '../auth-admin/auth.decorator';
import { AdminRole } from '../admin/enums/role.enum';
import { ApiQuery } from '@nestjs/swagger';
import { FindPropertyDto } from './dto/find-property.dto';

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
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  async findAll(
    @Query() payload: FindPropertyDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Request() req,
  ) {
    const userJwt = req.user;
    console.log(payload);
    return await this.propertyService.findAll(
      { page: page, limit: limit },
      { ...payload, user: userJwt },
    );
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
