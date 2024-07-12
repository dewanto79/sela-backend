import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApprovalPropertyService } from './approval-property.service';
import { CreateApprovalPropertyDto } from './dto/create-approval-property.dto';
import { UpdateApprovalPropertyDto } from './dto/update-approval-property.dto';

@Controller('approval-property')
export class ApprovalPropertyController {
  constructor(private readonly approvalPropertyService: ApprovalPropertyService) {}

  @Post()
  create(@Body() createApprovalPropertyDto: CreateApprovalPropertyDto) {
    return this.approvalPropertyService.create(createApprovalPropertyDto);
  }

  @Get()
  findAll() {
    return this.approvalPropertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.approvalPropertyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApprovalPropertyDto: UpdateApprovalPropertyDto) {
    return this.approvalPropertyService.update(+id, updateApprovalPropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.approvalPropertyService.remove(+id);
  }
}
