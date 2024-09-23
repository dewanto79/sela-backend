import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
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
    name: 'document_id',
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
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    select: false,
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    select: false,
    type: 'timestamp',
    nullable: false,
    name: 'deleted_at',
  })
  deletedAt: Date;

  @ManyToOne(() => Property, (property) => property.images)
  @JoinColumn({ name: 'document_id' })
  properties: Property;
}
