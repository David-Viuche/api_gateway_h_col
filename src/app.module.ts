import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { OrdersModule } from './orders/orders.module';
import { MedicinesModule } from './medicines/medicines.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,
    OrdersModule,
    MedicinesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
