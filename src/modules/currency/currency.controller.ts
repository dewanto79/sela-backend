import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { AdminAuth } from '../auth-admin/auth.decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Currency Module')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  @AdminAuth()
  @ApiQuery({
    name: 'keyword',
    required: false,
  })
  async findAll(@Query('keyword') keyword: string) {
    return await this.currencyService.findAll(keyword);
  }

  @Get('active')
  async findCurrentActiveCurrency() {
    return await this.currencyService.findCurrentActiveCurrency();
  }
}
