import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { RepositoryModule } from 'src/models/repository.module';
import { AgentService } from './agent.service';

@Module({
  imports: [RepositoryModule],
  controllers: [AdminController],
  providers: [AdminService, AgentService],
  exports: [AdminService, AgentService],
})
export class AdminModule {}
