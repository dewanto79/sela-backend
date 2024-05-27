import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepositoryService from './repository.service';
import { Admin } from './entities/admin.entity';
import { Property } from './entities/property.entity';
import { Tag } from './entities/tag.entity';
import { PropertyTag } from './entities/property-tag.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Admin, Property, Tag, PropertyTag])],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
