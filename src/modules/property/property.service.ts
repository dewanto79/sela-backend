import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import RepositoryService from 'src/models/repository.service';
import { Tag } from 'src/models/entities/tag.entity';
import { Property } from 'src/models/entities/property.entity';
import { UpdatePropertyStatusDto } from './dto/update-status.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { FindPropertyDto } from './dto/find-property.dto';
import { AdminRole } from '../admin/enums/role.enum';
import { Brackets } from 'typeorm';
import { Facility } from 'src/models/entities/facility.entity';
import { UpdatePublishedDto } from './dto/update-published.dto';
import { PropertyStatus } from './enums/property-status.enum';
import { ApprovalStatus } from '../property-approval/enums/approval-status.enum';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { AdminResponse } from '../admin/dto/response/admin.response';
import { PropertyApprovalService } from '../property-approval/property-approval.service';

@Injectable()
export class PropertyService {
  public constructor(
    private readonly repoService: RepositoryService,
    private readonly propertyApprovalService: PropertyApprovalService,
  ) {}

  async create(payload: CreatePropertyDto) {
    await this.isCreatePropertyStatusValid(payload.status);
    const addressData = await this.repoService.addressRepo.save({
      subdistrict: payload.address.subdistrict,
      regency: payload.address.regency,
      province: payload.address.province,
      detail: payload.address.detail ?? null,
      locationMaps: payload.address.locationMaps ?? null,
    });
    const propertyData = await this.repoService.propertyRepo.save({
      agentId: payload.user.id,
      title: payload.title,
      descriptionId: payload.descriptionId,
      keyFeatureId: payload.keyFeatureId,
      descriptionEn: payload.descriptionEn,
      keyFeatureEn: payload.keyFeatureEn,
      price: payload.price,
      currencyId: payload?.currency ?? 'IDR',
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
      owner: payload.owner,
      ownerPhone: payload.ownerPhone,
      googleDriveUrl: payload.googleDriveUrl,
      addressId: addressData.id,
    });
    const [savedTag, savedFacility, savedImage] = await Promise.all([
      this.handleSavingTag(propertyData.id, payload.tags),
      this.handleSavingFacility(propertyData.id, payload.facilities),
      this.handleSavingImage(propertyData.id, payload.images),
    ]);

    if (payload.status == PropertyStatus.IN_REVIEW) {
      if (payload.user.roles.includes(AdminRole.ADMIN)) {
        const propertyNumber =
          await this.propertyApprovalService.generatePropertyNumber(
            propertyData,
          );
        await this.repoService.propertyRepo.update(
          { id: propertyData.id },
          { status: PropertyStatus.APPROVED, propertyNumber: propertyNumber },
        );
      } else {
        const admins = await this.repoService.adminRepo.find();
        for (const admin of admins) {
          await this.repoService.propertyApprovalRepo.save({
            propertyId: propertyData.id,
            agentId: admin.id,
            note: '',
            status: ApprovalStatus.IN_REVIEW,
          });
        }
      }
    }

    return {
      ...propertyData,
      address: addressData,
      tags: savedTag,
      facilities: savedFacility,
      images: savedImage,
    };
  }

  async findAll(options: IPaginationOptions, payload: FindPropertyDto) {
    let data = this.repoService.propertyRepo
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('property.tags', 'tags')
      .leftJoinAndSelect('property.facilities', 'facilities')
      .leftJoinAndSelect('property.images', 'images')
      .addSelect(['images.updatedAt'])
      .leftJoin('property.currency', 'currency')
      .addSelect(['currency.id', 'currency.symbolNative'])
      .leftJoin('property.agent', 'agent')
      .addSelect(['agent.name']);

    if (payload.keyword && payload.keyword != '') {
      data = data.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(property.title) LIKE LOWER(:title)', {
            title: '%' + payload.keyword + '%',
          }).orWhere('property.propertyNumber LIKE :number', {
            number: '%' + payload.keyword + '%',
          });
        }),
      );
    }
    if (payload.lowerPrice && payload.lowerPrice > 0) {
      data = data.andWhere('property.price >= :lowerPrice', {
        lowerPrice: payload.lowerPrice,
      });
    }
    if (payload.higherPrice && payload.higherPrice > 0) {
      data = data.andWhere('property.price <= :higherPrice', {
        higherPrice: payload.higherPrice,
      });
    }
    if (payload.status && payload.status != '') {
      data = data.andWhere('property.status = :status', {
        status: payload.status,
      });
    }
    if (payload.availability && payload.availability != '') {
      data = data.andWhere('property.availability = :availability', {
        availability: payload.availability,
      });
    }
    if (payload.propertyType && payload.propertyType != '') {
      data = data.andWhere('property.propertyType = :propertyType', {
        propertyType: payload.propertyType,
      });
    }
    if (payload.sellingType) {
      data = data.andWhere('property.sellingType = :sellingType', {
        sellingType: payload.sellingType,
      });
    }
    if (payload.tags && payload.tags != '') {
      const queryTags = payload.tags.split(',');
      data = data.andWhere('tags.name IN (:...tags)', {
        tags: queryTags,
      });
    }
    if (payload.facilities && payload.facilities != '') {
      const facilityTags = payload.facilities.split(',');
      data = data.andWhere('facilities.name IN (:...facilities)', {
        tags: facilityTags,
      });
    }
    if (payload.address && payload.address != '') {
      data = data.andWhere('address.subdistrict = :address', {
        address: payload.address,
      });
    }
    if (payload.user) {
      const userRoles: string[] = payload.user.roles;
      switch (userRoles.toString()) {
        case [AdminRole.LISTING_AGENT, AdminRole.SELLING_AGENT].toString():
        case [AdminRole.SELLING_AGENT, AdminRole.LISTING_AGENT].toString():
          data = data.andWhere(
            new Brackets((qb) => {
              qb.where('property.status = :status', {
                status: 'approved',
              }).orWhere('property.agentId = :agentId', {
                agentId: payload.user.id,
              });
            }),
          );
          break;
        case AdminRole.SELLING_AGENT:
          data = data.andWhere('property.status = :status', {
            status: 'approved',
          });
          break;
        case AdminRole.LISTING_AGENT:
          data = data.andWhere('property.agentId = :agentId', {
            agentId: payload.user.id,
          });
          break;
        default:
          data = data.andWhere('property.status != :status', {
            status: 'draft',
          });
          break;
      }
    }

    const totalItems = await data.getCount();
    const limit = options.limit;
    const page = options.page;
    if (
      Number(page) > Math.ceil(totalItems / Number(limit)) ||
      Number(limit) * Number(page) == 0
    ) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error_code: 'NOT_FOUND',
          message: 'data not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const propertyData = await data
      .take(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .getMany();
    propertyData.forEach((data) =>
      data.images.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      ),
    );
    const paginational = {
      items: propertyData,
      meta: {
        totalItems: totalItems,
        itemCount: propertyData.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / Number(limit)),
        currentPage: Number(page),
      },
    };

    return paginational;
  }

  async findOne(id: string) {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('property.currency', 'currency')
      .leftJoinAndSelect('property.tags', 'tags')
      .leftJoinAndSelect('property.facilities', 'facilities')
      .leftJoinAndSelect('property.images', 'images')
      .leftJoinAndSelect('property.approvals', 'approvals')
      .leftJoinAndSelect('property.agent', 'agent')
      .leftJoinAndSelect('property.admin', 'admin')
      .where('property.id = :id', { id: id })
      .orderBy('images.updatedAt', 'ASC')
      .getOne();
    await this.isPropertyExist(property);

    property.createdByName = property.admin?.name || property.agent?.name;

    delete property.admin;
    delete property.agent;

    return property;
  }

  async update(id: string, payload: UpdatePropertyDto) {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .where('property.id = :id', { id: id })
      .getOne();
    await Promise.all([
      this.isPropertyExist(property), // check property exist
      this.isUpdatePropertyAllowed(property.status), // check is status allowed to update
      this.isCreatePropertyStatusValid(payload.status), // check inputed status
      this.isCreatedByAgentOrAdmin(payload.user, property.agentId), // check is created by the same agent
    ]);
    // delete address, tag, facility, image
    await Promise.all([
      this.repoService.propertyTagRepo.delete({ propertyId: id }),
      this.repoService.propertyFacilityRepo.delete({ propertyId: id }),
      this.repoService.imageRepo.delete({ documentId: id }),
    ]);

    // save address
    await this.repoService.addressRepo.update(property.addressId, {
      subdistrict: payload.address.subdistrict,
      regency: payload.address.regency,
      province: payload.address.province,
      detail: payload.address.detail ?? null,
      locationMaps: payload.address.locationMaps ?? null,
    });

    // update property
    await this.repoService.propertyRepo.update(id, {
      title: payload.title,
      descriptionId: payload.descriptionId,
      keyFeatureId: payload.keyFeatureId,
      descriptionEn: payload.descriptionEn,
      keyFeatureEn: payload.keyFeatureEn,
      price: payload.price,
      currencyId: payload?.currency ?? 'IDR',
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
      owner: payload.owner,
      ownerPhone: payload.ownerPhone,
      googleDriveUrl: payload.googleDriveUrl,
      addressId: property.addressId,
    });
    const [savedTag, savedFacility, savedImage] = await Promise.all([
      this.handleSavingTag(id, payload.tags),
      this.handleSavingFacility(id, payload.facilities),
      this.handleSavingImage(id, payload.images),
    ]);

    //check if payload status is in review
    if (payload.status == PropertyStatus.IN_REVIEW) {
      // check is the editor is admin
      if (payload.user.roles.includes(AdminRole.ADMIN)) {
        if (property.propertyNumber) {
          await this.repoService.propertyRepo.update(
            { id: id },
            { status: PropertyStatus.APPROVED },
          );
        } else {
          const propertyNumber =
            await this.propertyApprovalService.generatePropertyNumber(property);
          await this.repoService.propertyRepo.update(
            { id: id },
            { status: PropertyStatus.APPROVED, propertyNumber: propertyNumber },
          );
        }
      } else {
        const admins = await this.repoService.adminRepo.find();
        for (const admin of admins) {
          await this.repoService.propertyApprovalRepo.save({
            propertyId: id,
            agentId: admin.id,
            note: '',
            status: ApprovalStatus.IN_REVIEW,
          });
        }
      }
    }
    return {
      ...payload,
      address: payload.address,
      tags: savedTag,
      facilities: savedFacility,
      images: savedImage,
    };
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

  async updatePublished(id: string, payload: UpdatePublishedDto) {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .where('property.id = :id', { id: id })
      .getOne();
    await Promise.all([
      this.isPropertyExist(property),
      this.isPropertyApproved(property),
    ]);
    await this.repoService.propertyRepo.update(id, {
      published: payload.published,
    });
    return property;
  }

  async updateAvailability(id: string, payload: UpdateAvailabilityDto) {
    const property = await this.repoService.propertyRepo
      .createQueryBuilder('property')
      .where('property.id = :id', { id: id })
      .getOne();
    await Promise.all([
      this.isPropertyExist(property),
      this.isPropertyApproved(property),
    ]);
    await this.repoService.propertyRepo.update(id, {
      availability: payload.availability,
    });
    return property;
  }

  async delete(id: string) {
    const data = await this.repoService.propertyRepo.softDelete(id);
    return data;
  }

  private async isPropertyExist(property: Property): Promise<Property> {
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

  private async isPropertyApproved(property: Property): Promise<Property> {
    if (property.status != PropertyStatus.APPROVED) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errorCode: 'BAD_REQUEST',
          message: 'property not approved',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return property;
  }

  private async handleSavingTag(propertyId: string, tags: { name: string }[]) {
    // handle save tag
    const tagDatas: Tag[] = [];
    if (tags.length > 0) {
      const propertyTag = [];
      for (const tag of tags) {
        let tagData = await this.repoService.tagRepo.findOne({
          where: { name: tag.name },
        });
        if (!tagData) {
          tagData = await this.repoService.tagRepo.save(tag);
        }
        tagDatas.push(tagData);
      }

      for (const tag of tagDatas) {
        propertyTag.push(
          this.repoService.propertyTagRepo.create({
            propertyId: propertyId,
            tagId: tag.id,
          }),
        );
      }
      await this.repoService.propertyTagRepo.save(propertyTag);
    }
    return tagDatas;
  }

  private async handleSavingFacility(
    propertyId: string,
    facilities: { name: string }[],
  ) {
    const savedFacilities: Facility[] = [];
    if (facilities.length > 0) {
      const propertyFacility = [];
      for (const facility of facilities) {
        let facilityData = await this.repoService.facilityRepo.findOne({
          where: { name: facility.name },
        });
        if (!facilityData) {
          facilityData = await this.repoService.facilityRepo.save({
            name: facility.name,
          });
        }
        savedFacilities.push(facilityData);

        propertyFacility.push(
          this.repoService.propertyFacilityRepo.create({
            propertyId: propertyId,
            facilityId: facilityData.id,
          }),
        );
      }
      await this.repoService.propertyFacilityRepo.save(propertyFacility);
    }
    return savedFacilities;
  }

  private async handleSavingImage(
    propertyId: string,
    images: { url: string; type: string }[],
  ) {
    const savedImage = [];
    if (images.length > 0) {
      for (const image of images) {
        const imageData = this.repoService.imageRepo.create({
          url: image.url,
          type: image.type,
          documentId: propertyId,
        });
        savedImage.push(imageData);
      }
      await this.repoService.imageRepo.save(savedImage);
    }
  }

  private async isCreatePropertyStatusValid(status: PropertyStatus) {
    const notAllowedStatus = [
      PropertyStatus.APPROVED,
      PropertyStatus.ASK_REVISION,
      PropertyStatus.REJECTED,
    ];
    if (notAllowedStatus.includes(status)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error_code: 'BAD_REQUEST',
          message: 'status is not allowed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async isUpdatePropertyAllowed(status: string) {
    const notAllowedStatus = [
      PropertyStatus.IN_REVIEW.toString(),
      PropertyStatus.REJECTED.toString(),
    ];
    if (notAllowedStatus.includes(status)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error_code: 'BAD_REQUEST',
          message: 'status is not allowed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async isCreatedByAgentOrAdmin(user: AdminResponse, agentId: string) {
    if (user.roles.includes(AdminRole.ADMIN)) {
      return;
    }
    if (user.id != agentId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error_code: 'BAD_REQUEST',
          message: 'The agent is not the one who create the property',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
