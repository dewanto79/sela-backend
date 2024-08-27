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
  Delete,
  Req,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-status.dto';
import { AdminAuth, RolesAuth } from '../auth-admin/auth.decorator';
import { AdminRole } from '../admin/enums/role.enum';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindPropertyDto } from './dto/find-property.dto';
import { UpdatePublishedDto } from './dto/update-published.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Controller('property')
@ApiTags('Property Module')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @RolesAuth(AdminRole.ADMIN, AdminRole.LISTING_AGENT)
  @Post()
  async create(@Body() payload: CreatePropertyDto, @Request() req) {
    payload.user = req.user;
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
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdatePropertyDto,
    @Request() req,
  ) {
    payload.user = req.user;
    return await this.propertyService.update(id, payload);
  }

  @RolesAuth(AdminRole.ADMIN, AdminRole.LISTING_AGENT)
  @Put('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() payload: UpdatePropertyStatusDto,
  ) {
    return await this.propertyService.updateStatus(id, payload);
  }

  @RolesAuth(AdminRole.ADMIN)
  @Put('published/:id')
  async updatePublished(
    @Param('id') id: string,
    @Body() payload: UpdatePublishedDto,
  ) {
    return await this.propertyService.updatePublished(id, payload);
  }

  @RolesAuth(AdminRole.ADMIN, AdminRole.LISTING_AGENT)
  @Put('availability/:id')
  async updateAvailability(
    @Param('id') id: string,
    @Body() payload: UpdateAvailabilityDto,
    @Req() req,
  ) {
    payload.userId = req.user.id;
    return await this.propertyService.updateAvailability(id, payload);
  }

  @RolesAuth(AdminRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.propertyService.delete(id);
  }
}
