import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import RepositoryService from 'src/models/repository.service';
import { Tag } from 'src/models/entities/tag.entity';
import { Property } from 'src/models/entities/property.entity';
import { UpdatePropertyStatusDto } from './dto/update-status.dto';

@Injectable()
export class PropertyService {
  public constructor(private readonly repoService: RepositoryService) {}

  async create(payload: CreatePropertyDto) {
    const addressData = await this.repoService.addressRepo.save({
      subdistrict: payload.address.subdistrict,
      regency: payload.address.regency,
      province: payload.address.province,
      detail: payload.address.detail ?? null,
      locationMaps: payload.address.locationMaps ?? null,
    });
    const propertyData = await this.repoService.propertyRepo.save({
      title: payload.title,
      descriptionId: payload.descriptionId,
      keyFeatureId: payload.keyFeatureId,
      descriptionEn: payload.descriptionEn,
      keyFeatureEn: payload.keyFeatureEn,
      price: payload.price,
      status: payload.status,
      availability: payload.availability,
      sellingType: payload.sellingType,
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
      googleDriveUrl: payload.googleDriveUrl,
      addressId: addressData.id,
    });

    const savedTag = [];
    if (payload.tags.length > 0) {
      const propertyTag = [];
      for (const tag of payload.tags) {
        let tagData = await this.repoService.tagRepo.findOne({
          where: { name: tag.name },
        });
        if (!tagData) {
          tagData = await this.repoService.tagRepo.save({ name: tag.name });
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

    const savedFacility = [];
    if (payload.facilities.length > 0) {
      const propertyFacility = [];
      for (const facility of payload.facilities) {
        let facilityData = await this.repoService.facilityRepo.findOne({
          where: { name: facility.name },
        });
        if (!facilityData) {
          facilityData = await this.repoService.facilityRepo.save({
            name: facility.name,
          });
        }
        savedFacility.push(facilityData);

        propertyFacility.push(
          this.repoService.propertyFacilityRepo.create({
            propertyId: propertyData.id,
            facilityId: facilityData.id,
          }),
        );
      }
      await this.repoService.propertyFacilityRepo.save(propertyFacility);
    }

    const savedImage = [];
    if (payload.images.length > 0) {
      for (const image of payload.images) {
        const imageData = this.repoService.imageRepo.create({
          url: image.url,
          type: image.type,
          documentId: propertyData.id,
        });
        savedImage.push(imageData);
      }
      await this.repoService.imageRepo.save(savedImage);
    }

    return {
      ...propertyData,
      address: addressData,
      tags: savedTag,
      facilities: savedFacility,
      images: savedImage,
    };
  }

  async findAll() {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('property.tags', 'tags')
      .leftJoinAndSelect('property.facilities', 'facilities')
      .leftJoinAndSelect('property.images', 'images')
      .getMany();
    return property;
  }

  async findOne(id: string) {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('property.tags', 'tags')
      .leftJoinAndSelect('property.facilities', 'facilities')
      .leftJoinAndSelect('property.images', 'images')
      .where('property.id = :id', { id: id })
      .getOne();
    return await this.isPropertyExist(property);
  }

  async update(id: string, payload: UpdatePropertyDto) {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .where('property.id = :id', { id: id })
      .getOne();
    await this.isPropertyExist(property);

    Promise.all([
      await this.repoService.propertyTagRepo.delete({ propertyId: id }),
      await this.repoService.addressRepo.delete({ id: property.addressId }),
      await this.repoService.propertyFacilityRepo.delete({ propertyId: id }),
      await this.repoService.imageRepo.delete({ documentId: id }),
    ]);

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

    const addressData = await this.repoService.addressRepo.save({
      subdistrict: payload.address.subdistrict,
      regency: payload.address.regency,
      province: payload.address.province,
      detail: payload.address.detail ?? null,
      locationMaps: payload.address.locationMaps ?? null,
    });

    await this.repoService.propertyRepo.update(id, {
      title: payload.title,
      descriptionId: payload.descriptionId,
      keyFeatureId: payload.keyFeatureId,
      descriptionEn: payload.descriptionEn,
      keyFeatureEn: payload.keyFeatureEn,
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
      googleDriveUrl: payload.googleDriveUrl,
      addressId: addressData.id,
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
    return { ...property, tags: tagIds };
  }

  async updateStatus(id: string, payload: UpdatePropertyStatusDto) {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .where('property.id = :id', { id: id })
      .getOne();
    await this.isPropertyExist(property);

    await this.repoService.propertyRepo.update(id, {
      status: payload.status,
    });

    return property;
  }

  async isPropertyExist(property: Property): Promise<Property> {
    if (!property) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errorCode: 'PROPERTY_NOT_FOUND',
          message: 'property not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return property;
  }
}
