import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import RepositoryService from 'src/models/repository.service';
import { Admin } from 'src/models/entities/admin.entity';
import { RequestAdmin } from './dto/admin.interface';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class AdminService {
  public constructor(private readonly repoService: RepositoryService) {}

  async getOneAdminByData(payload: RequestAdmin): Promise<Admin> {
    const admin = await this.repoService.adminRepo.findOne({
      where: payload,
    });

    if (admin) {
      return admin;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error_code: 'USER_NOT_FOUND',
        message: 'User with this email does not exist',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(payload: CreateAdminDto): Promise<Admin> {
    const newUser = this.repoService.adminRepo.create(payload);
    await this.repoService.adminRepo.save(newUser);
    return newUser;
  }

  async update(id: string, payload: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);

    this.repoService.adminRepo.update(
      { id: id },
      {
        name: payload.name,
        email: payload.email,
        role: payload.role,
        password: payload.password,
        status: payload.status,
      },
    );

    // update data for return
    admin.name = payload.name;
    admin.email = payload.email;
    admin.role = payload.role;
    admin.password = payload.password;
    admin.status = payload.status;

    return admin;
  }

  async findAll(
    options: IPaginationOptions,
    keyword: string,
  ): Promise<Pagination<Admin>> {
    const data = this.repoService.adminRepo.createQueryBuilder('admin');

    if (keyword && keyword != '') {
      data.andWhere('admin.name ILIKE :name', {
        name: '%' + keyword + '%',
      });
    }

    return paginate<Admin>(data, options);
  }

  async findOne(id: string) {
    const admin = await this.repoService.adminRepo.findOne({
      where: { id: id },
    });

    if (!admin) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error_code: 'ADMIN_NOT_FOUND',
          message: 'data not found on system',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return admin;
  }

  async remove(id: string) {
    await this.findOne(id);

    const deleted = await this.repoService.adminRepo.delete(id);

    return deleted;
  }
}
