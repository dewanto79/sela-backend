import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'properties' })
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'active',
  })
  status: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  availability: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  tags: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'property_type',
  })
  propertyType: string;

  @Column({
    type: 'decimal',
    nullable: false,
    name: 'land_size',
  })
  landSize: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'land_size_measurement',
  })
  landSizeMeasurement: string;

  @Column({
    type: 'decimal',
    nullable: false,
    name: 'building_size',
  })
  buildingSize: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'building_size_measurement',
  })
  buildingSizeMeasurement: string;

  @Column({
    type: 'smallint',
    nullable: false,
    default: 0,
    name: 'bed_rooms_amount',
  })
  bedRoomsAmount: number;

  @Column({
    type: 'smallint',
    nullable: false,
    default: 0,
    name: 'bath_rooms_amount',
  })
  bathRoomsAmount: number;

  @Column({
    type: 'smallint',
    nullable: false,
    default: 0,
    name: 'garage_amount',
  })
  garageAmount: number;

  @Column({
    type: 'smallint',
    nullable: false,
    default: 0,
    name: 'car_park_amount',
  })
  carParkAmount: number;

  @Column({
    type: 'smallint',
    nullable: false,
    default: 0,
    name: 'floor_amount',
  })
  floorAmount: number;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'building_orientation',
  })
  buildingOrientation: string;

  @Column({
    type: 'integer',
    nullable: true,
    default: 0,
    name: 'electricity',
  })
  electricity: number;

  @Column({
    type: 'bool',
    nullable: false,
    default: false,
  })
  furnished: number;

  @Column({
    type: 'varchar',
    name: 'address_id',
  })
  addressId: string;

  @CreateDateColumn({
    select: false,
    type: 'timestamp with time zone',
    nullable: false,
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    select: false,
    type: 'timestamp with time zone',
    nullable: false,
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    select: false,
    type: 'timestamp with time zone',
    nullable: false,
    name: 'deleted_at',
  })
  deletedAt: Date;
}
