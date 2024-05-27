import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity({ name: 'images' })
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  documentId: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'normal',
  })
  type: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  url: string;

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

  @ManyToMany(() => Property, (property) => property.images, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  properties?: Property[];
}
