import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/database/prisma.service';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class AppointmentsService {

  constructor(private prisma: PrismaService, private patient: PatientsService, private doctor: DoctorsService) { }
  async create(createAppointmentDto: CreateAppointmentDto) {

    const { doctorId, appoDate, patientId } = createAppointmentDto

    const existingDoctor = await this.doctor.findOneById(doctorId)

    const existingPatient = await this.patient.findOne(patientId)

    const existingDateAsing = await this.prisma.appointment.findFirst({ where: { doctorId: existingDoctor.doctorId, appoDate } })

    if (existingDateAsing) {
      throw new HttpException('The doctor already has an appointment assigned on that date', HttpStatus.BAD_REQUEST);
    }

    const currentDate = new Date();

    const formattedDate = currentDate.toISOString();

    return this.prisma.appointment.create(
      {
        data: {
          appoDate,
          state: 'P',
          updateSt: formattedDate,
          patient: {
            connect: {
              patientId: existingPatient.patientId,
            },
          },
          doctor: {
            connect: {
              doctorId: existingDoctor.doctorId,
            },
          },
        },
      }
    );
  }

  async findAll() {
    return await this.prisma.appointment.findMany();
  }

  async findOne(dateId: number) {
    const appointment = await this.prisma.appointment.findUnique({ where: { dateId } });

    if (!appointment) {
      throw new HttpException('The record with the given ID was not found', HttpStatus.NOT_FOUND);
    }
    return appointment;
  }

  async findByIdAndDate(id: string, date: string) {

    const patient = await this.patient.findByIdentification(String(id))

    const appointment = await this.prisma.appointment.findFirst({ where: { patientId: patient.patientId, appoDate: date } });

    if (!appointment) {
      throw new HttpException('The record with the given data was not found', HttpStatus.NOT_FOUND);
    }
    return appointment;
  }

  async update(dateId: number, updateAppointmentDto: UpdateAppointmentDto) {

    const appointment = await this.prisma.appointment.findUnique({ where: { dateId } });

    if (!appointment) {
      throw new HttpException('The record with the given ID was not found', HttpStatus.NOT_FOUND);
    }

    const { doctorId, appoDate, patientId } = updateAppointmentDto

    if (doctorId) {
      await this.doctor.findOneById(doctorId)
    }

    if (patientId) {
      await this.patient.findOne(patientId)
    }

    if (appoDate) {
      const existingDateAsing = await this.prisma.appointment.findFirst({ where: { doctorId: appointment.doctorId, appoDate } })

      if (existingDateAsing) {
        throw new HttpException('The doctor already has an appointment assigned on that date', HttpStatus.BAD_REQUEST);
      }
    }

    const currentDate = new Date();

    const formattedDate = currentDate.toISOString();

    return this.prisma.appointment.update({
      where: { dateId },
      data: { ...updateAppointmentDto, updateSt: formattedDate },
    });
  }

  async remove(dateId: number) {
    const appointment = await this.prisma.appointment.findUnique({ where: { dateId } });

    if (!appointment) {
      throw new HttpException('The record with the given ID was not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.appointment.delete({ where: { dateId } });
  }

  async findDoctorsAvailable(date: string) {

    if (!date) {
      throw new HttpException('The date query param is required', HttpStatus.BAD_REQUEST);
    }

    const doctorsWithAppointments = await this.prisma.doctor.findMany({
      include: {
        appointments: {
          where: {
            appoDate: date,
          },
        }
      },
    });

    // Filtrar los médicos que no tienen citas en la fecha dada
    const availableDoctors = doctorsWithAppointments.filter(
      (doctor) => doctor.appointments.length === 0
    );

    return availableDoctors;
  }
}
