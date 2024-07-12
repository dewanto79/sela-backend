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
import { AdminResponse } from './dto/response/admin.response';

@Injectable()
export class AgentService {
  public constructor(private readonly repoService: RepositoryService) {}

  async getByEmail(email: string) {
    const agent = await this.repoService.agentRepo
      .createQueryBuilder('agent')
      .leftJoin('agent.roles', 'roles')
      .addSelect('roles.name')
      .where('agent.email = :email', { email })
      .getOne();

    await this.isAgentExist(agent);

    return await this.mapAgentReponse(agent);
  }

  async mapAgentReponse(payload: Agent): Promise<AdminResponse> {
    const arrayRole = payload.roles.map((r) => r.name);
    return {
      email: payload.email,
      name: payload.name,
      roles: arrayRole,
      status: 'active',
      password: payload.password,
    };
  }

  async findAll(
    options: IPaginationOptions,
    keyword: string,
    roles: string,
  ): Promise<Pagination<Agent>> {
    const data = this.repoService.agentRepo
      .createQueryBuilder('agent')
      .leftJoin('agent.roles', 'roles')
      .addSelect('roles.name');

    if (keyword && keyword != '') {
      data.andWhere('agent.name ILIKE :name', {
        name: '%' + keyword + '%',
      });
    }
    if (roles && roles != '') {
      const roleQuery = roles.split(',');
      data.andWhere('roles.name IN (:...roles)', { roles: roleQuery });
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

    const mapAgent = [];
    for (const agent of result.items) {
      mapAgent.push(await this.mapAgentReponse(agent));
    }
    return { items: mapAgent, meta: result.meta };
  }

  async findOne(id: string) {
    const agent = await this.repoService.agentRepo
      .createQueryBuilder('agent')
      .leftJoin('agent.roles', 'roles')
      .addSelect('roles.name')
      .where('agent.id = :id', { id })
      .getOne();

    await this.isAgentExist(agent);

    return await this.mapAgentReponse(agent);
  }

  async create(payload: CreateAgentDto) {
    await this.isEmailAgentAlreadyExist(payload.email);

    const agent = await this.repoService.agentRepo.save({
      email: payload.email,
      name: payload.name,
      status: payload.status,
      password: payload.password,
    });
    const roles = await this.repoService.roleRepo.find();
    for (const role of payload.roles) {
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
    await this.repoService.agentRepo.update(id, {
      email: payload.email,
      name: payload.name,
      status: payload.status,
      password: payload.password,
    });
    const roles = await this.repoService.roleRepo.find();
    for (const role of payload.roles) {
      const dataRole = roles.find((r) => r.name == role);
      await this.repoService.agentRoleRepo.save({
        agentId: id,
        roleId: dataRole.id,
      });
    }
    return payload;
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
  private async isEmailAgentAlreadyExist(email: string) {
    const agent = await this.repoService.agentRepo
      .createQueryBuilder('agent')
      .where('agent.email = :email', { email })
      .getOne();
    if (agent) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errorCode: 'EMAIL_ALREADY_REGISTERED',
          message: 'Email already registered',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
