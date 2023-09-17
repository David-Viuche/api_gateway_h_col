import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
