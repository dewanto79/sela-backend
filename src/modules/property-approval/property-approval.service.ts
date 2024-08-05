import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePropertyApprovalDto } from './dto/update-property-approval.dto';
import RepositoryService from 'src/models/repository.service';
import { PropertyApproval } from 'src/models/entities/property-approval.entity';
import { ApprovalStatus } from './enums/approval-status.enum';
import { Property } from 'src/models/entities/property.entity';
import { PropertyType } from '../property/enums/property-type.enum';
import { SellingType } from '../property/enums/selling-type.enum';
import { In, Not } from 'typeorm';

@Injectable()
export class PropertyApprovalService {
  public constructor(private readonly repoService: RepositoryService) {}

  async update(propertyId: string, payload: UpdatePropertyApprovalDto) {
    const approval = await this.repoService.propertyApprovalRepo
      .createQueryBuilder('approval')
      .leftJoinAndSelect('approval.property', 'property')
      .leftJoinAndSelect('property.address', 'address')
      .where('approval.propertyId = :propertyId', { propertyId: propertyId })
      .andWhere('approval.agentId = :agentId', { agentId: payload.userId })
      .orderBy('approval.createdAt', 'DESC')
      .getOne();
    await Promise.all([
      this.isPropertyApprovalExist(approval),
      this.isStatusAllowed(payload.status),
      this.isStatusAlreadyMoved(payload.status),
    ]);
    await Promise.all([
      this.repoService.propertyRepo.update(propertyId, {
        status: payload.status,
      }),
      // update approval status to ALREADY_MOVED if user not doing approval
      this.repoService.propertyApprovalRepo.update(
        {
          propertyId: propertyId,
          status: Not(
            In([
              ApprovalStatus.APPROVED,
              ApprovalStatus.REJECTED,
              ApprovalStatus.ASK_REVISION,
            ]),
          ),
        },
        {
          status: ApprovalStatus.ALREADY_MOVED,
        },
      ),
    ]);
    if (payload.status == ApprovalStatus.APPROVED.toString()) {
      const propertyNumber = await this.generatePropertyNumber(
        approval.property,
      );
      this.repoService.propertyRepo.update(propertyId, {
        propertyNumber: propertyNumber,
      });
    }

    return await this.repoService.propertyApprovalRepo.update(approval.id, {
      note: payload.note,
      status: payload.status,
    });
  }

  async generatePropertyNumber(property: Property): Promise<string> {
    const lastApproved = await this.repoService.propertyRepo
      .createQueryBuilder()
      .where('property_number IS NOT NULL')
      .orderBy('property_number', 'DESC')
      .getOne();

    const number = lastApproved?.propertyNumber
      ? (Number(lastApproved.propertyNumber.split('/', 1)[0]) + 1).toString()
      : '1';
    return `${number}/${this.getPropertyTypeCode(
      property.propertyType,
    )}/${this.getPropertySellingTypeCode(
      property.sellingType,
    )}/${this.getMonthYearCode()}`;
  }

  private async isPropertyApprovalExist(
    property: PropertyApproval,
  ): Promise<PropertyApproval> {
    if (!property) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errorCode: 'PROPERTY_APPROVAL_NOT_FOUND',
          message: 'property approval not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return property;
  }

  private async isStatusAllowed(status: ApprovalStatus) {
    const notAllowedStatus = [
      ApprovalStatus.ASK_REVISION,
      ApprovalStatus.REJECTED,
      ApprovalStatus.APPROVED,
    ];
    if (notAllowedStatus.includes(status)) {
      return;
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error_code: 'BAD_REQUEST',
        message: 'status is not allowed',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  private async isStatusAlreadyMoved(status: ApprovalStatus) {
    const notAllowedStatus = [ApprovalStatus.ALREADY_MOVED];
    if (!notAllowedStatus.includes(status)) {
      return;
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error_code: 'BAD_REQUEST',
        message: 'status is already moved',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  private getPropertyTypeCode(type: string) {
    const typeCode = {
      [PropertyType.APARTMENT.toString()]: 'AP',
      [PropertyType.HOUSE.toString()]: 'HS',
      [PropertyType.HOTEL.toString()]: 'HT',
      [PropertyType.LAND.toString()]: 'LN',
      [PropertyType.VILLA.toString()]: 'VL',
    };
    return typeCode[type] || 'NEW';
  }

  private getPropertySellingTypeCode(type: string) {
    const typeCode = {
      [SellingType.RENT]: 'RN',
      [SellingType.SELL]: 'SL',
    };
    return typeCode[type] || type;
  }

  private getMonthYearCode() {
    const currentTime = new Date();
    const month = currentTime.getMonth() + 1;
    const year = currentTime.getFullYear();

    const monthRomawi = {
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V',
      6: 'VI',
      7: 'VII',
      8: 'VIII',
      9: 'IX',
      10: 'X',
      11: 'XI',
      12: 'XII',
    };
    return `${monthRomawi[month]}/${year}`;
  }
}
