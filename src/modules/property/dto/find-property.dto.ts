import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { AdminResponse } from 'src/modules/admin/dto/response/admin.response';
import { SellingType } from '../enums/selling-type.enum';
import { ToBoolean } from 'src/decorator/to-boolean';
import { Transform } from 'class-transformer';

export class FindPropertyDto {
  user?: AdminResponse;

  @ApiProperty({ required: false })
  @IsOptional()
  keyword?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsNumberString()
  @IsOptional()
  lowerPrice?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsNumberString()
  @IsOptional()
  higherPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  status?: string;

  @ApiProperty({ required: false })
  @ToBoolean()
  @IsOptional()
  availability?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  propertyType?: string;

  @ApiProperty({
    enum: SellingType,
    required: false,
  })
  @Transform((params) => (params.value === '' ? null : params.value))
  @IsEnum(SellingType, { always: false })
  @IsOptional()
  sellingType?: SellingType;

  @ApiProperty({ required: false })
  @IsOptional()
  tags?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  facilities?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  address?: string;
}
