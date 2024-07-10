import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Agent } from 'src/models/entities/agent.entity';
import RepositoryService from 'src/models/repository.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentService {
  public constructor(private readonly repoService: RepositoryService) {}

  async getByEmail(email: string): Promise<Agent> {
    const agent = await this.repoService.agentRepo
      .createQueryBuilder('agent')
      .leftJoin('agent.role', 'roles')
      .addSelect('roles.name')
      .where('agent.email = :email', { email })
      .getOne();

    await this.isAgentExist(agent);

    if (agent.role.length > 0) {
      const arrayRole = agent.role.map((r) => r.name);
      agent['roles'] = arrayRole;
      delete agent.role;
    }
    return agent;
  }

  async findAll(
    options: IPaginationOptions,
    keyword: string,
    role: string,
  ): Promise<Pagination<Agent>> {
    const data = this.repoService.agentRepo
      .createQueryBuilder('agent')
      .leftJoin('agent.role', 'roles')
      .addSelect('roles.name');

    if (keyword && keyword != '') {
      data.andWhere('agent.name ILIKE :name', {
        name: '%' + keyword + '%',
      });
    }
    if (role && role != '') {
      const roleQuery = role.split(',');
      data.andWhere('roles.name IN (:...role)', { role: roleQuery });
    }

    const result = await paginate<Agent>(data, options);
    if (result.meta.itemCount == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errorCode: 'NOT_FOUND',
          message: 'data not found on system',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async findOne(id: string) {
    const agent = await this.repoService.agentRepo
      .createQueryBuilder('agent')
      .leftJoin('agent.role', 'roles')
      .addSelect('roles.name')
      .where('agent.id = :id', { id })
      .getOne();

    await this.isAgentExist(agent);

    if (agent.role.length > 0) {
      const arrayRole = agent.role.map((r) => r.name);
      agent['roles'] = arrayRole;
      delete agent.role;
    }
    return agent;
  }

  async create(payload: CreateAgentDto) {
    const agent = await this.repoService.agentRepo.save({
      email: payload.email,
      name: payload.name,
      status: payload.status,
      password: payload.password,
    });
    const roles = await this.repoService.roleRepo.find();
    for (const role of payload.role) {
      const dataRole = roles.find((r) => r.name == role);
      await this.repoService.agentRoleRepo.save({
        agentId: agent.id,
        roleId: dataRole.id,
      });
    }
    return agent;
  }

  async update(id: string, payload: UpdateAgentDto) {
    await this.findOne(id);
    await this.repoService.agentRoleRepo.delete({ agentId: id });
    const agent = await this.repoService.agentRepo.update(id, {
      email: payload.email,
      name: payload.name,
      status: payload.status,
      password: payload.password,
    });
    const roles = await this.repoService.roleRepo.find();
    for (const role of payload.role) {
      const dataRole = roles.find((r) => r.name == role);
      await this.repoService.agentRoleRepo.save({
        agentId: id,
        roleId: dataRole.id,
      });
    }
    return agent;
  }

  private async isAgentExist(agent: Agent) {
    if (!agent) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errorCode: 'AGENT_NOT_FOUND',
          message: 'Agent not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
