import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreatePatientDto) {

    const existingIdPatient = await this.prisma.patient.findUnique({ where: { id: data.id } });

    if (existingIdPatient) {
      throw new HttpException('There is already a patient registered with this identification number', HttpStatus.BAD_REQUEST);
    }

    const existingEmailPatient = await this.prisma.patient.findUnique({ where: { email: data.email } });

    if (existingEmailPatient) {
      throw new HttpException('There is already a patient registered with this email', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.patient.create({ data });
  }

  async findAll(): Promise<CreatePatientDto[]> {
    return this.prisma.patient.findMany({
      include: {
        appointments: {
          include: {
            orders: {
              include: {
                Medicine: {}
              }
            }
          }
        },
      },
    });
  }

  async findOne(patientId: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { patientId }, include: {
        appointments: {
          include: {
            orders: {
              include: {
                Medicine: {}
              }
            }
          }
        },
      },
    });

    if (!patient) {
      throw new HttpException('The record pacient with the given ID was not found', HttpStatus.NOT_FOUND);
    }
    return patient;
  }
  async findByIdentification(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id }, include: {
        appointments: {
          include: {
            orders: {
              include: {
                Medicine: {}
              }
            }
          }
        },
      },
    });

    if (!patient) {
      throw new HttpException('The record with the given identification was not found', HttpStatus.NOT_FOUND);
    }
    return patient;
  }

  async update(patientId: number, updatePatientDto: UpdatePatientDto) {

    if (updatePatientDto.id) {
      const existingIdPatient = await this.prisma.patient.findUnique({ where: { id: updatePatientDto.id } });
      if (existingIdPatient && existingIdPatient.patientId !== patientId) {
        throw new HttpException('There is already a patient registered with this identification number', HttpStatus.BAD_REQUEST);
      }
    }

    if (updatePatientDto.email) {
      const existingEmailPatient = await this.prisma.patient.findUnique({ where: { email: updatePatientDto.email } });
      if (existingEmailPatient && existingEmailPatient.patientId !== patientId) {
        throw new HttpException('There is already a patient registered with this email', HttpStatus.BAD_REQUEST);
      }
    }

    const patient = await this.prisma.patient.findUnique({ where: { patientId } });

    if (!patient) {
      throw new HttpException('The record with the given ID was not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.patient.update({
      where: { patientId },
      data: updatePatientDto,
    });
  }

  async remove(patientId: number) {
    const patient = await this.prisma.patient.findUnique({ where: { patientId } });

    if (!patient) {
      throw new HttpException('The record with the given ID was not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.patient.delete({ where: { patientId } });
  }
}
