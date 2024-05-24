import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepositoryService from './repository.service';
import { Admin } from './entities/admin.entity';
import { Property } from './entities/property.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Admin, Property])],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
