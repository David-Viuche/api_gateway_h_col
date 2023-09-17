import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersService } from 'src/orders/orders.service';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';

@Module({
  controllers: [MedicinesController],
  providers: [MedicinesService, PrismaService, OrdersService, AppointmentsService, PatientsService, DoctorsService]
})
export class MedicinesModule { }
