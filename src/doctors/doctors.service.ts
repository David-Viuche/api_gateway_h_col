import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateDoctorDto): Promise<Doctor> {

    const existingIdDoctor = await this.prisma.doctor.findUnique({ where: { id: data.id } });

    if (existingIdDoctor) {
      throw new HttpException('There is already a doctor registered with this identification number', HttpStatus.BAD_REQUEST);
    }

    const existingEmailDoctor = await this.prisma.doctor.findUnique({ where: { email: data.email } });

    if (existingEmailDoctor) {
      throw new HttpException('There is already a doctor registered with this email', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.doctor.create({ data });
  }

  async findAll(): Promise<CreateDoctorDto[]> {
    return this.prisma.doctor.findMany();
  }

  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });

    if (!doctor) {
      throw new HttpException('The record with the given ID was not found', HttpStatus.NOT_FOUND);
    }
    return doctor;
  }

  async update(doctorId: number, UpdateDoctorDto: UpdateDoctorDto) {

    if (UpdateDoctorDto.id) {
      const existingIdDoctor = await this.prisma.doctor.findUnique({ where: { id: UpdateDoctorDto.id } });
      if (existingIdDoctor && existingIdDoctor.doctorId !== doctorId) {
        throw new HttpException('There is already a doctor registered with this identification number', HttpStatus.BAD_REQUEST);
      }
    }

    if (UpdateDoctorDto.email) {
      const existingEmailDoctor = await this.prisma.doctor.findUnique({ where: { email: UpdateDoctorDto.email } });
      if (existingEmailDoctor && existingEmailDoctor.doctorId !== doctorId) {
        throw new HttpException('There is already a doctor registered with this email', HttpStatus.BAD_REQUEST);
      }
    }

    const doctor = await this.prisma.doctor.findUnique({ where: { doctorId } });

    if (!doctor) {
      throw new HttpException('The record with the given ID was not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.doctor.update({
      where: { doctorId },
      data: UpdateDoctorDto,
    });
  }

  async remove(doctorId: number) {
    const doctor = await this.prisma.doctor.findUnique({ where: { doctorId } });

    if (!doctor) {
      throw new HttpException('The record with the given ID was not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.doctor.delete({ where: { doctorId } });
  }
}
