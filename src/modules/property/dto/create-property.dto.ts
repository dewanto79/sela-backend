import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsUrl,
  ValidateNested,
} from 'class-validator';

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
  price: number;

  @ApiProperty({
    type: 'string',
    nullable: false,
    default: 'active',
  })
  status: string;

  @ApiProperty({
    nullable: false,
  })
  availability: boolean;

  @ApiProperty({
    type: 'string',
    nullable: false,
  })
  propertyType: string;

  @ApiProperty({
    nullable: false,
  })
  landSize: number;

  @ApiProperty({
    type: 'string',
    nullable: false,
  })
  landSizeMeasurement: string;

  @ApiProperty({
    nullable: false,
  })
  buildingSize: number;

  @ApiProperty({
    type: 'string',
    nullable: false,
  })
  buildingSizeMeasurement: string;

  @ApiProperty({
    type: 'smallint',
    nullable: false,
    default: 0,
  })
  bedRoomsAmount: number;

  @ApiProperty({
    type: 'smallint',
    nullable: false,
    default: 0,
  })
  bathRoomsAmount: number;

  @ApiProperty({
    type: 'smallint',
    nullable: false,
    default: 0,
  })
  garageAmount: number;

  @ApiProperty({
    type: 'smallint',
    nullable: false,
    default: 0,
  })
  carParkAmount: number;

  @ApiProperty({
    type: 'smallint',
    nullable: false,
    default: 0,
  })
  floorAmount: number;

  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  buildingOrientation: string;

  @ApiProperty({
    type: 'integer',
    nullable: true,
    default: 0,
  })
  electricity: number;

  @ApiProperty({
    type: 'bool',
    nullable: false,
    default: false,
  })
  furnished: boolean;

  @ApiProperty({ type: 'string' })
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
}
