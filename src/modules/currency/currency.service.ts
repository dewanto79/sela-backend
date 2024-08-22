import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import RepositoryService from 'src/models/repository.service';
import { FetchCurrencyResponse } from './dto/response/fetch-currency.interface';

@Injectable()
export class CurrencyService {
  public constructor(
    private readonly repoService: RepositoryService,
    private readonly httpService: HttpService,
  ) {}

  async findAll(keyword: string) {
    let data = this.repoService.currencyRepo
      .createQueryBuilder('currency')
      .select([
        'currency.id',
        'currency.symbolNative',
        'currency.currencyRate',
      ]);

    if (keyword && keyword != '') {
      data = data.andWhere('currency.id = :keyword', {
        keyword: keyword,
      });
    }
    return await data.getMany();
  }

  async findCurrentActiveCurrency() {
    return await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .select('property.currencyId')
      .distinctOn(['property.currencyId'])
      .getMany();
  }

  async updateCurrencyRate() {
    const [currencies, currencyResult] = await Promise.all([
      await this.repoService.currencyRepo.find(),
      await this.fetchCurrency(),
    ]);

    for (const currency of currencies) {
      const rate = currencyResult.rates[currency.id];

      await this.repoService.currencyRepo.update(currency.id, {
        currencyRate: rate,
      });
    }
  }

  private async fetchCurrency(): Promise<FetchCurrencyResponse> {
    const currencyApiKey = process.env.CURRENCY_FREAKS_API_KEY;

    const result = await firstValueFrom(
      this.httpService
        .get(
          `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${currencyApiKey}`,
          {
            headers: {
              accept: 'application/json',
            },
          },
        )
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            console.log('ERROR - FETCH CURRENCY', error.response.data);
            throw error.response.data;
          }),
        ),
    );
    return result;
  }
}
