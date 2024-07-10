import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Agent } from './agent.entity';
import { Role } from './role.entity';

@Entity('agents_roles')
export class AgentRole {
  @PrimaryColumn({ name: 'agent_id' })
  agentId: string;

  @PrimaryColumn({ name: 'role_id' })
  roleId: string;

  @ManyToOne(() => Agent, (agent) => agent.role, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'agent_id', referencedColumnName: 'id' }])
  agents: Agent[];

  @ManyToOne(() => Role, (role) => role.agents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role[];
}
