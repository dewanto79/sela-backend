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

@Injectable()
export class AdminService {
  public constructor(private readonly repoService: RepositoryService) {}

  async getByEmail(email: string): Promise<Admin> {
    const admin = await this.repoService.adminRepo.findOne({
      where: { email: email },
      select: ['id', 'email', 'name', 'password', 'role', 'status'],
    });

    await this.isAdminExist(admin);

    admin['roles'] = [admin.role];
    delete admin.role;
    return admin;
  }

  async create(payload: CreateAdminDto): Promise<Admin> {
    return await this.repoService.adminRepo.save({
      email: payload.email,
      name: payload.name,
      role: payload.role,
      status: 'active',
      password: payload.password,
    });
  }

  async update(id: string, payload: UpdateAdminDto) {
    await this.findOne(id);

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
    payload.password = undefined;

    return payload;
  }

  async findAll(
    options: IPaginationOptions,
    keyword: string,
    role: AdminRole,
  ): Promise<Pagination<Admin>> {
    const data = this.repoService.adminRepo.createQueryBuilder('admin');

    if (keyword && keyword != '') {
      data.andWhere('admin.name ILIKE :name', {
        name: '%' + keyword + '%',
      });
    }

    if (role) {
      data.andWhere('admin.role = :role', { role: role });
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

    admin['roles'] = [admin.role];
    delete admin.role;
    return admin;
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
