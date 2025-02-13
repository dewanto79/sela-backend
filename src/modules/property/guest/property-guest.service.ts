import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import RepositoryService from 'src/models/repository.service';
import { Property } from 'src/models/entities/property.entity';
import { FindPropertyGuestDto } from '../dto/find-property-guest.dto';
import { CurrencyService } from 'src/modules/currency/currency.service';
import { Brackets } from 'typeorm';

@Injectable()
export class PropertyGuestService {
  public constructor(
    private readonly repoService: RepositoryService,
    private readonly currencyService: CurrencyService,
  ) {}

  async findAll(options: IPaginationOptions, payload: FindPropertyGuestDto) {
    let data = this.repoService.propertyRepo
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('property.tags', 'tags')
      .leftJoinAndSelect('property.facilities', 'facilities')
      .leftJoinAndSelect('property.images', 'images')
      .addSelect(['images.updatedAt'])
      .where('property.published IS true');

    if (payload.keyword && payload.keyword != '') {
      data = data.andWhere('LOWER(property.title) LIKE LOWER(:title)', {
        title: '%' + payload.keyword + '%',
      });
    }
    if (payload.lowerPrice || payload.higherPrice) {
      let currencyRates;
      if (payload.currency) {
        currencyRates = await this.currencyService.getRate(payload.currency);
      } else {
        currencyRates = await this.currencyService.getRate('IDR');
      }

      if (payload.lowerPrice && payload.lowerPrice > 0) {
        data = data.andWhere(
          new Brackets((qb) => {
            for (const currencyRate of currencyRates) {
              qb.orWhere(
                new Brackets((qb2) => {
                  qb2
                    .where(
                      `property.price >= ${
                        payload.lowerPrice * currencyRate.currency_rate
                      }`,
                    )
                    .andWhere(
                      `property.currencyId = '${currencyRate.property_currency_id}'`,
                    );
                }),
              );
            }
          }),
        );
      }

      if (payload.higherPrice && payload.higherPrice > 0) {
        data = data.andWhere(
          new Brackets((qb) => {
            for (const currencyRate of currencyRates) {
              qb.orWhere(
                new Brackets((qb2) => {
                  qb2
                    .where(
                      `property.price <= ${
                        payload.higherPrice * currencyRate.currency_rate
                      }`,
                    )
                    .andWhere(
                      `property.currencyId = '${currencyRate.property_currency_id}'`,
                    );
                }),
              );
            }
          }),
        );
      }
    }
    if (payload.availability && payload.availability != '') {
      data = data.andWhere('property.availability = :availability', {
        availability: payload.availability,
      });
    }
    if (payload.propertyType && payload.propertyType != '') {
      data = data.andWhere('property.propertyType = :propertyType', {
        propertyType: payload.propertyType,
      });
    }
    if (payload.sellingType) {
      data = data.andWhere('property.sellingType = :sellingType', {
        sellingType: payload.sellingType,
      });
    }
    if (payload.tags && payload.tags != '') {
      const queryTags = payload.tags.split(',');
      data = data.andWhere('tags.name IN (:...tags)', {
        tags: queryTags,
      });
    }
    if (payload.facilities && payload.facilities != '') {
      const facilityTags = payload.facilities.split(',');
      data = data.andWhere('facilities.name IN (:...facilities)', {
        tags: facilityTags,
      });
    }
    if (payload.address && payload.address != '') {
      data = data.andWhere('address.subdistrict = :address', {
        address: payload.address,
      });
    }

    const totalItems = await data.getCount();
    const limit = options.limit;
    const page = options.page;
    if (
      Number(page) > Math.ceil(totalItems / Number(limit)) ||
      Number(limit) * Number(page) == 0
    ) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error_code: 'NOT_FOUND',
          message: 'data not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const propertyData = await data
      .take(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .getMany();
    propertyData.forEach((data) =>
      data.images.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      ),
    );

    const paginational = {
      items: propertyData,
      meta: {
        totalItems: totalItems,
        itemCount: propertyData.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / Number(limit)),
        currentPage: Number(page),
      },
    };

    return paginational;
  }

  async findOne(id: string) {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('property.tags', 'tags')
      .leftJoinAndSelect('property.facilities', 'facilities')
      .leftJoinAndSelect('property.images', 'images')
      .where('property.id = :id', { id: id })
      .andWhere('property.published = true')
      .orderBy('images.updatedAt', 'ASC')
      .getOne();
    return await this.isPropertyExist(property);
  }

  private async isPropertyExist(property: Property): Promise<Property> {
    if (!property) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errorCode: 'PROPERTY_NOT_FOUND',
          message: 'property not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return property;
  }
}
