import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export default class RepositoryService {
  /**
   * All Models are injected here
   * You can create a new Injected model here
   */
  public constructor(
    @InjectRepository(Admin)
    public readonly adminRepo: Repository<Admin>,
  ) {}
}
