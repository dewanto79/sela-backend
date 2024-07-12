import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { Image } from './image.entity';
import { Facility } from './facility.entity';
import { Address } from './address.entity';
import { Agent } from './agent.entity';
import { PropertyApproval } from './property-approval.entity';

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
    nullable: true,
    name: 'description_id',
  })
  descriptionId: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'key_feature_id',
  })
  keyFeatureId: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'description_en',
  })
  descriptionEn: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'key_feature_en',
  })
  keyFeatureEn: string;

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
    type: 'bool',
    nullable: false,
    default: true,
  })
  availability: boolean;

  @Column({
    type: 'bool',
    nullable: false,
    default: false,
  })
  published: boolean;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'property_type',
  })
  propertyType: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'selling_type',
    default: 'SELL',
  })
  sellingType: string;

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
  furnished: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'google_drive_url',
  })
  googleDriveUrl: string;

  @Column({
    type: 'varchar',
    name: 'address_id',
    nullable: true,
  })
  addressId: string;

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'agent_id',
  })
  agentId: string;

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

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @ManyToMany(() => Tag, (tag) => tag.properties, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'properties_tags',
    joinColumn: {
      name: 'property_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags?: Tag[];

  @OneToMany(() => Image, (image) => image.properties)
  @JoinColumn({ name: 'id' })
  images?: Image[];

  @ManyToMany(() => Facility, (facility) => facility.properties, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'properties_facilities',
    joinColumn: {
      name: 'property_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'facility_id',
      referencedColumnName: 'id',
    },
  })
  facilities?: Facility[];

  @ManyToOne(() => Agent, (agent) => agent.properties)
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;

  @OneToMany(() => PropertyApproval, (approval) => approval.property)
  @JoinColumn({ name: 'id' })
  approvals?: PropertyApproval[];
}
