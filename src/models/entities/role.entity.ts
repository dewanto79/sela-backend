import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agent } from './agent.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'active',
  })
  status: string;

  @ManyToMany(() => Agent, (agent) => agent.roles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  agents?: Agent[];
}
