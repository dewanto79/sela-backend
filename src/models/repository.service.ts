import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { Property } from './entities/property.entity';
import { Tag } from './entities/tag.entity';
import { PropertyTag } from './entities/property-tag.entity';
import { Image } from './entities/image.entity';
import { Facility } from './entities/facility.entity';
import { PropertyFacility } from './entities/property-facility.entity';
import { Address } from './entities/address.entity';

@Injectable()
export default class RepositoryService {
  /**
   * All Models are injected here
   * You can create a new Injected model here
   */
  public constructor(
    @InjectRepository(Admin)
    public readonly adminRepo: Repository<Admin>,

    @InjectRepository(Property)
    public readonly propertyRepo: Repository<Property>,

    @InjectRepository(Tag)
    public readonly tagRepo: Repository<Tag>,

    @InjectRepository(PropertyTag)
    public readonly propertyTagRepo: Repository<PropertyTag>,

    @InjectRepository(Image)
    public readonly imageRepo: Repository<Image>,

    @InjectRepository(Facility)
    public readonly facilityRepo: Repository<Facility>,

    @InjectRepository(PropertyFacility)
    public readonly propertyFacilityRepo: Repository<PropertyFacility>,

    @InjectRepository(Address)
    public readonly addressRepo: Repository<Address>,
  ) {}
}
