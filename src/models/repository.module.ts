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
    ]),
  ],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
