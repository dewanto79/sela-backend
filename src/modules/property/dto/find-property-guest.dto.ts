import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { SellingType } from '../enums/selling-type.enum';
import { ToBoolean } from 'src/decorator/to-boolean';

export class FindPropertyGuestDto {
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
