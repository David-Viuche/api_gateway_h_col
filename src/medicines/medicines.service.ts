import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class MedicinesService {
  constructor(private prisma: PrismaService, private order: OrdersService) { }
  async create(createMedicineDto: CreateMedicineDto) {
    const { orderId, descr, diseases } = createMedicineDto

    const existingOrder = await this.order.findOne(orderId)

    return this.prisma.medicine.create(
      {
        data: {
          descr,
          diseases,
          order: {
            connect: {
              orderId: existingOrder.orderId,
            },
          }
        },
      }
    );
  }

  async findAll() {
    return await this.prisma.medicine.findMany();
  }

  async findOne(medId: number) {
    const medicine = await this.prisma.medicine.findUnique({ where: { medId } });

    if (!medicine) {
      throw new HttpException('The record medicine with the given ID was not found', HttpStatus.NOT_FOUND);
    }
    return medicine;
  }

  async update(medId: number, updateMedicineDto: UpdateMedicineDto) {
    const { orderId } = updateMedicineDto

    await this.findOne(medId)

    if (orderId) {
      await this.order.findOne(orderId)
    }

    return this.prisma.medicine.update({
      where: { medId },
      data: updateMedicineDto,
    });
  }

  async remove(medId: number) {
    await this.findOne(medId)
    return this.prisma.medicine.delete({ where: { medId } });
  }
}
