import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Property } from './property.entity';
import { Facility } from './facility.entity';

@Entity('properties_facilities')
export class PropertyFacility {
  @PrimaryColumn({ name: 'property_id' })
  propertyId: string;

  @PrimaryColumn({ name: 'facility_id' })
  facilityId: string;

  @ManyToOne(() => Property, (property) => property.facilities, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'property_id', referencedColumnName: 'id' }])
  properties: Property[];

  @ManyToOne(() => Facility, (facility) => facility.properties, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'facility_id', referencedColumnName: 'id' }])
  facilities: Facility[];
}
