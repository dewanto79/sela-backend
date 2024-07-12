import { Injectable } from '@nestjs/common';
import { CreateApprovalPropertyDto } from './dto/create-approval-property.dto';
import { UpdateApprovalPropertyDto } from './dto/update-approval-property.dto';

@Injectable()
export class ApprovalPropertyService {
  create(payload: CreateApprovalPropertyDto) {
    return 'This action adds a new approvalProperty';
  }

  findAll() {
    return `This action returns all approvalProperty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} approvalProperty`;
  }

  update(id: number, updateApprovalPropertyDto: UpdateApprovalPropertyDto) {
    return `This action updates a #${id} approvalProperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} approvalProperty`;
  }
}
