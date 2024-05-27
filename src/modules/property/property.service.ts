import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import RepositoryService from 'src/models/repository.service';
import { Tag } from 'src/models/entities/tag.entity';

@Injectable()
export class PropertyService {
  public constructor(private readonly repoService: RepositoryService) {}

  async create(payload: CreatePropertyDto) {
    const propertyData = await this.repoService.propertyRepo.save({
      title: payload.title,
      description: payload.description,
      price: payload.price,
      status: payload.status,
      availability: payload.availability,
      propertyType: payload.propertyType,
      landSize: payload.landSize,
      landSizeMeasurement: payload.landSizeMeasurement,
      buildingSize: payload.buildingSize,
      buildingSizeMeasurement: payload.buildingSizeMeasurement,
      bedRoomsAmount: payload.bedRoomsAmount,
      bathRoomsAmount: payload.bathRoomsAmount,
      garageAmount: payload.garageAmount,
      carParkAmount: payload.carParkAmount,
      floorAmount: payload.floorAmount,
      buildingOrientation: payload.buildingOrientation,
      electricity: payload.electricity,
      furnished: payload.furnished,
      addressId: payload.addressId,
    });
    const savedTag = [];
    if (payload.tags.length > 0) {
      const propertyTag = [];
      for (const tag of payload.tags) {
        let tagData = await this.repoService.tagRepo.findOne({
          where: { name: tag.name },
        });
        if (!tagData) {
          tagData = await this.repoService.tagRepo.save(tag);
        }
        savedTag.push(tagData);

        propertyTag.push(
          this.repoService.propertyTagRepo.create({
            propertyId: propertyData.id,
            tagId: tagData.id,
          }),
        );
      }
      await this.repoService.propertyTagRepo.save(propertyTag);
    }

    return { ...propertyData, tags: savedTag };
  }

  async findAll() {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.tags', 'tags')
      .getMany();
    return property;
  }

  async findOne(id: string) {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.tags', 'tags')
      .where('property.id = :id', { id: id })
      .getOne();

    if (!property) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errorCode: 'PROPERTY_NOT_FOUND',
          message: 'property not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, payload: UpdatePropertyDto) {
    await this.repoService.propertyTagRepo.delete({ propertyId: id });

    const tagIds: Tag[] = [];
    if (payload.tags.length > 0) {
      for (const tag of payload.tags) {
        let tagData = await this.repoService.tagRepo.findOne({
          where: { name: tag.name },
        });
        if (!tagData) {
          tagData = await this.repoService.tagRepo.save(tag);
        }
        tagIds.push(tagData);
      }
    }
    const propertyData = await this.repoService.propertyRepo.update(id, {
      title: payload.title,
      description: payload.description,
      price: payload.price,
      status: payload.status,
      availability: payload.availability,
      propertyType: payload.propertyType,
      landSize: payload.landSize,
      landSizeMeasurement: payload.landSizeMeasurement,
      buildingSize: payload.buildingSize,
      buildingSizeMeasurement: payload.buildingSizeMeasurement,
      bedRoomsAmount: payload.bedRoomsAmount,
      bathRoomsAmount: payload.bathRoomsAmount,
      garageAmount: payload.garageAmount,
      carParkAmount: payload.carParkAmount,
      floorAmount: payload.floorAmount,
      buildingOrientation: payload.buildingOrientation,
      electricity: payload.electricity,
      furnished: payload.furnished,
      addressId: payload.addressId,
    });
    if (tagIds.length > 0) {
      const propertyTag = [];
      for (const tag of tagIds) {
        propertyTag.push(
          this.repoService.propertyTagRepo.create({
            propertyId: id,
            tagId: tag.id,
          }),
        );
      }
      await this.repoService.propertyTagRepo.save(propertyTag);
    }
    return { ...propertyData, tags: tagIds };
  }

  async remove(id: string) {
    return `This action removes a #${id} property`;
  }
}
