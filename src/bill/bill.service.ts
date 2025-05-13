import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BillService {

  constructor(
    private prismaService: PrismaService,
    private userService: UserService
  ) { }

  async create(bill: Express.Multer.File, createBillDto: CreateBillDto) {
    const { amount, concept, identificationOwner, provider, type, observations } = createBillDto;

    if (amount === undefined || isNaN(Number(amount))) {
      throw new Error('El campo "amount" debe ser un número válido.');
    }

    const user = await this.userService.findOneByIdentification(identificationOwner);
    const { id } = user;
    return await this.prismaService.bill.create({
      data: {
        amount: +amount,
        concept,
        ownerId: id,
        image: bill.filename,
        provider,
        type,
        observations,
      }
    })
  }

  async findAllByUserId(userId: string) {
    const bills = await this.prismaService.bill.findMany({
      where: {
        ownerId: userId,
      },
    });
    return bills;
  }

  async findOne(id: string) {
    const bill = await this.prismaService.bill.findUnique({
      where: {
        id
      }
    })
    return bill;
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    const { amount, concept, provider, type, observations } = updateBillDto;

    if (amount === undefined || isNaN(Number(amount))) {
      throw new Error('El campo "amount" debe ser un número válido.');
    }

    try {
      const updatedBill = await this.prismaService.bill.update({
        where: { id },
        data: {
          amount: +amount,
          concept,
          provider,
          type,
          observations,
        }
      });
      return updatedBill;
    } catch (error) {
      throw new Error(`Factura con ID ${id} no encontrada o no se pudo actualizar.`);
    }
  }

  async remove(id: string) {
    try {
      const deletedBill = await this.prismaService.bill.delete({
        where: { id },
      });
      return deletedBill;
    } catch (error) {
      throw new Error(`Factura con ID ${id} no encontrada o no se pudo eliminar.`);
    }
  }
}
