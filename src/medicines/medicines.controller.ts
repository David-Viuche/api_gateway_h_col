import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';

@ApiTags('Medicines')
@Controller('medicines')
@ApiBearerAuth()
@UseGuards(JwtGuardGuard)
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) { }

  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.create(createMedicineDto);
  }

  @Get()
  findAll() {
    return this.medicinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicinesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMedicineDto: UpdateMedicineDto) {
    return this.medicinesService.update(id, updateMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicinesService.remove(id);
  }
}
