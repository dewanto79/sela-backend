import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import RepositoryService from 'src/models/repository.service';
import { Admin } from 'src/models/entities/admin.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { AdminRole } from './enums/role.enum';
import { AdminResponse } from './dto/response/admin.response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  public constructor(private readonly repoService: RepositoryService) {}

  async getByEmail(email: string): Promise<AdminResponse> {
    const admin = await this.repoService.adminRepo.findOne({
      where: { email: email },
      select: ['id', 'email', 'name', 'password', 'roles', 'status'],
    });

    await this.isAdminExist(admin);

    return await this.mapAdminReponse(admin);
  }

  async mapAdminReponse(payload: Admin): Promise<AdminResponse> {
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      roles: [payload.roles],
      status: 'active',
      password: payload.password,
    };
  }

  async create(payload: CreateAdminDto): Promise<Admin> {
    return await this.repoService.adminRepo.save({
      email: payload.email,
      name: payload.name,
      roles: payload.roles,
      status: 'active',
      password: payload.password,
    });
  }

  async update(id: string, payload: UpdateAdminDto) {
    const admin = await this.findOne(id);

    let hashedPassword = '';
    if (payload.password && payload.password != '') {
      hashedPassword = await bcrypt.hash(payload.password, 10);
    }
    this.repoService.adminRepo.update(
      { id: id },
      {
        name: payload.name,
        email: payload.email,
        password: hashedPassword == '' ? undefined : hashedPassword,
      },
    );

    return {
      ...admin,
      name: payload.name,
      email: payload.email,
      password: undefined,
    };
  }

  async findAll(
    options: IPaginationOptions,
    keyword: string,
    roles: AdminRole,
  ): Promise<Pagination<Admin>> {
    const data = this.repoService.adminRepo.createQueryBuilder('admin');

    if (keyword && keyword != '') {
      data.andWhere('admin.name ILIKE :name', {
        name: '%' + keyword + '%',
      });
    }

    if (roles) {
      data.andWhere('admin.roles = :roles', { roles: roles });
    }

    const result = await paginate<Admin>(data, options);
    if (result.meta.itemCount == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errorCode: 'NOT_FOUND',
          message: 'data not found on system',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async findOne(id: string) {
    const admin = await this.repoService.adminRepo.findOne({
      where: { id: id },
    });
    await this.isAdminExist(admin);

    return await this.mapAdminReponse(admin);
  }

  async remove(id: string) {
    await this.findOne(id);

    const deleted = await this.repoService.adminRepo.delete(id);

    return deleted;
  }

  private async isAdminExist(admin: Admin) {
    if (!admin) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errorCode: 'ADMIN_NOT_FOUND',
          message: 'data not found on system',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
