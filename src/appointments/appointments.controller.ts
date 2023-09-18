import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtGuardGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.appointmentsService.findOne(id);
  // }

  @Get('available-doctors')
  findAvailableDoctors(@Query('date') date: string,) {
    return this.appointmentsService.findDoctorsAvailable(date);
  }

  @Get(':id')
  findByIdAndDate(@Param('id', ParseIntPipe) id: string, @Query('date') date: string,) {
    return this.appointmentsService.findByIdAndDate(id, date);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.remove(id);
  }
}
