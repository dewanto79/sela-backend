import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class CronjobService {
  public constructor(private readonly currencyService: CurrencyService) {}

  @Timeout(5000)
  handleTimeout() {
    console.log('Called once after 5 seconds');
  }

  //server running at UTC+0
  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  handleUpdateCurrencyRate() {
    console.log(`Update currency rate running ${new Date()} ...`);
    this.currencyService.updateCurrencyRate();
    console.log(`Update currency rate done!`);
  }
}
