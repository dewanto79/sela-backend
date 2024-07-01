import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/models/entities/admin.entity';
import { UpdateAdminDto } from '../admin/dto/update-admin.dto';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  public async register(registrationData: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.adminService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errorCode: 'BAD_REQUEST',
          message: 'Error in registering admin',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const admin = await this.adminService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, admin.password);
      admin.password = undefined;
      return admin;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errorCode: 'INVALID_CREDENTIALS',
          message: 'Invalid credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errorCode: 'INVALID_CREDENTIALS',
          message: 'Invalid credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async generateJwt(admin: Admin) {
    const payload = {
      email: admin.email,
      role: admin.role,
      id: admin.id,
      name: admin.name,
      status: admin.status,
    };

    return {
      profile: payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  public async updateAdmin(id: string, updateData: UpdateAdminDto) {
    let hashedPassword = null;
    if (updateData.password) {
      hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }
    try {
      const updateUser = await this.adminService.update(id, updateData);
      return updateUser;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errorCode: 'BAD_REQUEST',
          message: 'Error in updating admin',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
