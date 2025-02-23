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

  update(id: string, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: string) {
    return `This action removes a #${id} bill`;
  }
}
