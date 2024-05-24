import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'admins' })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'ADMIN',
  })
  role: string;

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
