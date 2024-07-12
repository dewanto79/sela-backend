import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepositoryService from './repository.service';
import { Admin } from './entities/admin.entity';
import { Property } from './entities/property.entity';
import { Tag } from './entities/tag.entity';
import { PropertyTag } from './entities/property-tag.entity';
import { PropertyFacility } from './entities/property-facility.entity';
import { Facility } from './entities/facility.entity';
import { Image } from './entities/image.entity';
import { Address } from './entities/address.entity';
import { Agent } from './entities/agent.entity';
import { Role } from './entities/role.entity';
import { AgentRole } from './entities/agent-role.entity';
import { PropertyApproval } from './entities/property-approval.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      Property,
      Tag,
      PropertyTag,
      Image,
      Facility,
      PropertyFacility,
      Address,
      Agent,
      Role,
      AgentRole,
      PropertyApproval,
    ]),
  ],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
