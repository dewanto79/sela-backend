import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Property } from './property.entity';
import { Tag } from './tag.entity';

@Entity('properties_tags')
export class PropertyTag {
  @PrimaryColumn({ name: 'property_id' })
  propertyId: string;

  @PrimaryColumn({ name: 'tag_id' })
  tagId: string;

  @ManyToOne(() => Property, (property) => property.tags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'property_id', referencedColumnName: 'id' }])
  properties: Property[];

  @ManyToOne(() => Tag, (tag) => tag.properties, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tags: Tag[];
}
