import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, PrismaService, PatientsService, DoctorsService]
})
export class AppointmentsModule { }
