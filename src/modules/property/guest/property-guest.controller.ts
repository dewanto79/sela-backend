import {
  Controller,
  Get,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PropertyGuestService } from './property-guest.service';
import { FindPropertyGuestDto } from '../dto/find-property-guest.dto';

@Controller('guest/property')
@ApiTags('Property Guest Module')
export class PropertyGuestController {
  constructor(private readonly propertyGuestService: PropertyGuestService) {}

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
    @Query() payload: FindPropertyGuestDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return await this.propertyGuestService.findAll(
      { page: page, limit: limit },
      { ...payload },
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.propertyGuestService.findOne(id);
  }
}
