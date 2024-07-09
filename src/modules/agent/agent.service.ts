import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Agent } from 'src/models/entities/agent.entity';
import RepositoryService from 'src/models/repository.service';
import { CreateAgentDto } from './dto/create-agent.dto';

@Injectable()
export class AgentService {
  public constructor(private readonly repoService: RepositoryService) {}

  async getByEmail(email: string): Promise<Agent> {
    const agent = await this.repoService.adminRepo.findOne({
      where: { email: email },
      select: ['id', 'email', 'name', 'password'],
    });

    if (agent) {
      return agent;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errorCode: 'AGENT_NOT_FOUND',
        message: 'Agent not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(payload: CreateAgentDto): Promise<Agent> {
    return await this.repoService.agentRepo.save({
      email: payload.email,
      name: payload.name,
      role: payload.role,
      status: 'active',
      password: payload.password,
    });
  }
}
