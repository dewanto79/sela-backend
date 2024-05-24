import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  subdistrict: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  regency: string;

  @Column({
    type: 'varchar',
  })
  province: string;

  @Column({
    type: 'varchar',
  })
  detail: string;

  @Column({
    type: 'text',
  })
  locationMaps: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'active',
  })
  status: string;

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
