import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Property } from './property.entity';
import { Image } from './image.entity';

@Entity('properties_images')
export class PropertyImage {
  @PrimaryColumn({ name: 'property_id' })
  propertyId: string;

  @PrimaryColumn({ name: 'image_id' })
  imageId: string;

  @ManyToOne(() => Property, (property) => property.images, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'property_id', referencedColumnName: 'id' }])
  properties: Property[];

  @ManyToOne(() => Image, (image) => image.properties, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Image[];
}
