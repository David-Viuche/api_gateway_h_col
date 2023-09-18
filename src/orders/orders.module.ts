import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { PrismaService } from 'src/database/prisma.service';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, AppointmentsService, PatientsService, DoctorsService]
})
export class OrdersModule { }
