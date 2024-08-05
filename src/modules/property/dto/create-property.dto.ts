import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { SellingType } from '../enums/selling-type.enum';
import { PropertyStatus } from '../enums/property-status.enum';
import { PropertyType } from '../enums/property-type.enum';
import { AdminResponse } from 'src/modules/admin/dto/response/admin.response';

class Tag {
  @ApiProperty({ nullable: false })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;
}

class Facility {
  @ApiProperty({ nullable: false })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;
}

class Image {
  @ApiProperty({ nullable: false, default: 'normal' })
  @IsNotEmpty({ message: 'type should not be empty' })
  type: string;

  @ApiProperty({
    nullable: false,
    default: 'https://avatars.githubusercontent.com/u/91001646?s=48&v=4',
  })
  @IsNotEmpty({ message: 'url should not be empty' })
  @IsUrl({}, { message: 'image url must be a url' })
  url: string;
}

class CreateAddressDto {
  @ApiProperty({
    nullable: false,
  })
  @IsNotEmpty({ message: 'subdistrict should not be empty' })
  subdistrict: string;

  @ApiProperty({
    nullable: false,
  })
  @IsNotEmpty({ message: 'regency should not be empty' })
  regency: string;

  @ApiProperty({
    nullable: false,
    default: 'Bali',
  })
  @IsNotEmpty({ message: 'province should not be empty' })
  province: string;

  @ApiProperty()
  detail: string;

  @ApiProperty()
  locationMaps: string;
}

export class CreatePropertyDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
  })
  descriptionId: string;

  @ApiProperty({
    type: 'string',
  })
  keyFeatureId: string;

  @ApiProperty({
    type: 'string',
  })
  descriptionEn: string;

  @ApiProperty({
    type: 'string',
  })
  keyFeatureEn: string;

  @ApiProperty({
    type: 'number',
    nullable: false,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ default: PropertyStatus.DRAFT })
  @IsNotEmpty()
  @IsEnum(PropertyStatus, {})
  status: PropertyStatus;

  @ApiProperty()
  @IsNotEmpty()
  availability: boolean;

  @ApiProperty({ default: SellingType.SELL })
  @IsNotEmpty()
  @IsEnum(SellingType, {})
  sellingType: SellingType;

  @ApiProperty({ default: PropertyType.HOUSE })
  @IsNotEmpty()
  @IsEnum(PropertyType, {})
  propertyType: PropertyType;

  @ApiProperty()
  @IsNotEmpty()
  landSize: number;

  @ApiProperty()
  @IsNotEmpty()
  landSizeMeasurement: string;

  @ApiProperty({
    nullable: false,
  })
  @IsNotEmpty()
  buildingSize: number;

  @ApiProperty()
  @IsNotEmpty()
  buildingSizeMeasurement: string;

  @ApiProperty({
    default: 0,
  })
  bedRoomsAmount: number;

  @ApiProperty({
    default: 0,
  })
  bathRoomsAmount: number;

  @ApiProperty({
    default: 0,
  })
  garageAmount: number;

  @ApiProperty({
    default: 0,
  })
  carParkAmount: number;

  @ApiProperty({
    default: 1,
  })
  floorAmount: number;

  @ApiProperty()
  buildingOrientation: string;

  @ApiProperty({
    default: 0,
  })
  electricity: number;

  @ApiProperty({ default: false })
  @IsOptional()
  furnished: boolean;

  @ApiProperty()
  @IsOptional()
  owner: string;

  @ApiProperty()
  @IsOptional()
  ownerPhone: string;

  @ApiProperty()
  @IsOptional()
  googleDriveUrl: string;

  @ApiProperty({
    type: () => CreateAddressDto,
  })
  @Type(() => CreateAddressDto)
  @ValidateNested({ each: true })
  @IsNotEmpty({ message: 'Address should not be empty' })
  @IsNotEmptyObject(
    { nullable: false },
    { message: 'Address should not be empty object' },
  )
  address: CreateAddressDto;

  @ApiProperty({
    type: () => [Tag],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tag)
  tags: [Tag];

  @ApiProperty({
    type: () => [Facility],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Facility)
  facilities: [Facility];

  @ApiProperty({
    type: () => [Image],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: [Image];

  @ApiHideProperty()
  user: AdminResponse;
}
