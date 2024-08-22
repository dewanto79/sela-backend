import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [CurrencyModule],
  providers: [CronjobService],
})
export class CronjobModule {}
