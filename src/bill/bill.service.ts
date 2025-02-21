import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class BillService {

  constructor(private prismaService: PrismaService) { }

  async create(bill: Express.Multer.File, createBillDto: CreateBillDto) {
    const { amount, concept, owner, provider, type, observations } = createBillDto;

    return await this.prismaService.bill.create({
      data: {
        amount: +amount,
        concept,
        ownerId: owner,
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
    console.log(bills)
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

  update(id: string, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: string) {
    return `This action removes a #${id} bill`;
  }
}
