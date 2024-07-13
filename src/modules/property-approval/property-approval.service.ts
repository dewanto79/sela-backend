import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePropertyApprovalDto } from './dto/update-property-approval.dto';
import RepositoryService from 'src/models/repository.service';
import { PropertyApproval } from 'src/models/entities/property-approval.entity';
import { ApprovalStatus } from './enums/approval-status.enum';

@Injectable()
export class PropertyApprovalService {
  public constructor(private readonly repoService: RepositoryService) {}

  async update(propertyId: string, payload: UpdatePropertyApprovalDto) {
    const approval = await this.repoService.propertyApprovalRepo.findOne({
      where: { propertyId: propertyId, agentId: payload.userId },
    });
    await Promise.all([
      this.isPropertyApprovalExist(approval),
      this.isStatusAllowed(payload.status),
      this.isStatusAlreadyMoved(payload.status),
    ]);
    await Promise.all([
      this.repoService.propertyRepo.update(propertyId, {
        status: payload.status,
      }),
      this.repoService.propertyApprovalRepo.update(
        { propertyId: propertyId },
        {
          status: ApprovalStatus.ALREADY_MOVED,
        },
      ),
    ]);

    return await this.repoService.propertyApprovalRepo.update(approval.id, {
      note: payload.note,
      status: payload.status,
    });
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
}
