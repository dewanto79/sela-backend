import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getRate(currencyId: string) {
    const currencies = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .select('property.currencyId')
      .leftJoin('property.currency', 'currency')
      .addSelect(['currency.currencyRate'])
      .distinctOn(['property.currencyId'])
      .where('property.currencyId IS NOT NULL')
      .getRawMany();

    const currency = currencies.find(
      (currency) => currency.property_currency_id === currencyId.toUpperCase(),
    );
    if (!currency) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errorCode: 'BAD_REQUEST',
          message: 'currency not found in property',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const currencyRates = currencies.map((cur) => {
      return {
        ...cur,
        currency_rate:
          cur.currency_currency_rate / currency.currency_currency_rate,
      };
    });
    return currencyRates;
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
