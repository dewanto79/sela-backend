import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity({ name: 'currencies' })
export class Currency extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  symbol: string;

  @Column({ type: 'varchar', name: 'symbol_native' })
  symbolNative: string;

  @Column({ type: 'varchar', default: 'active' })
  status: string;

  @Column({ type: 'decimal', nullable: true, name: 'currency_rate' })
  currencyRate: string;

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

  @OneToMany(() => Property, (property) => property.currency)
  @JoinColumn({ name: 'id' })
  properties?: Property[];
}
