import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

class Tag {
  @ApiProperty({ nullable: false })
  @IsNotEmpty({ message: 'Tag name should not be empty' })
  name: string;
}

class Facility {
  @ApiProperty({ nullable: false })
  @IsNotEmpty({ message: 'Facility name should not be empty' })
  name: string;
}

class Image {
  
}

export class CreatePropertyDto {
  @ApiProperty()
  title: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
  })
  description: string;

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
    type: 'string',
    nullable: false,
  })
  availability: string;

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

  @ApiProperty({
    type: 'string',
  })
  addressId: string;

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
