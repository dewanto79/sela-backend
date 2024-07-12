import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { AdminResponse } from 'src/modules/admin/dto/response/admin.response';
import { SellingType } from '../enums/selling-type.enum';

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
  @IsBooleanString()
  @IsOptional()
  availability?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  propertyType?: string;

  @ApiProperty({
    enum: SellingType,
    required: false,
  })
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
