import { Currency } from '../../entities/currency.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as fs from 'fs';
import { join } from 'path';

export class Currency1724253828475 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('seeding currency');
    const currencyRepo = dataSource.getRepository(Currency);

    const currencies = fs.readFileSync(
      join(__dirname, './currency.json'),
      'utf8',
    );

    const currencyList = JSON.parse(currencies);
    for (const currency in currencyList) {
      const data = currencyList[currency];
      await currencyRepo.save({
        id: data.code,
        name: data.name,
        symbol: data.symbol,
        symbolNative: data.symbol_native,
      });
    }
  }
}
