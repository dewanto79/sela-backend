import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { Agent } from './agent.entity';
import { Admin } from './admin.entity';

@Entity({ name: 'properties_approvals' })
export class PropertyApproval extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: false,
    name: 'property_id',
  })
  propertyId: string;

  @Column({
    type: 'uuid',
    nullable: false,
    name: 'agent_id',
  })
  agentId: string;

  @Column({
    type: 'varchar',
  })
  status: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  note: string;

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

  @ManyToOne(() => Property, (property) => property.approvals)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @ManyToOne(() => Admin, (admin) => admin.approvals)
  @JoinColumn({ name: 'agent_id' })
  agent: Admin;
}
