import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/database/prisma.service';
import { AppointmentsService } from 'src/appointments/appointments.service';

@Injectable()
export class OrdersService {

  constructor(private prisma: PrismaService, private appointment: AppointmentsService) { }

  async create(createOrderDto: CreateOrderDto) {
    const { dateId, descr, date, specialty } = createOrderDto

    const existingAppo = await this.appointment.findOne(dateId)

    return this.prisma.order.create(
      {
        data: {
          descr,
          date,
          specialty,
          appointment: {
            connect: {
              dateId: existingAppo.dateId,
            },
          }
        },
      }
    );
  }

  async findAll() {
    return await this.prisma.order.findMany({
      include: {
        Medicine: {}
      }
    });
  }

  async findOne(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { orderId }, include: {
        Medicine: {}
      }
    });

    if (!order) {
      throw new HttpException('The record order with the given ID was not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async update(orderId: number, updateOrderDto: UpdateOrderDto) {
    const { dateId } = updateOrderDto

    await this.findOne(orderId)

    if (dateId) {
      await this.appointment.findOne(dateId)
    }

    return this.prisma.order.update({
      where: { orderId },
      data: updateOrderDto,
      include: {
        Medicine: {}
      }
    });
  }

  async remove(orderId: number) {
    await this.findOne(orderId)
    return this.prisma.order.delete({ where: { orderId } });
  }
}
