import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { Credential, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto, credential: Credential) {
    const { identification, name, phone, identificationType, profile } =
      createUserDto;
    return await this.prismaService.user.create({
      data: {
        email: credential.username,
        identification,
        identificationType,
        name,
        profile,
        phone,
        credentialId: credential.id,
      },
      omit: {
        credentialId: true,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOneByCredentialId(credentialId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { credentialId },
      include: { bills: true },
    });
    if (!user)
      throw new BadRequestException(
        `Not exist user with credentialId: ${credentialId}`,
      );
    return user;
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException(`Not exist user with id: ${id}`);
    return user;
  }

  async findOneByIdentification(identification: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        identification,
      },
    });
    if (!user)
      throw new BadRequestException(
        `Not exist user with identification: ${identification}`,
      );
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { phone } = updateUserDto;
    await this.prismaService.user.update({
      data: {
        phone,
      },
      where: {
        id,
      },
    });
  }

  async exists(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prismaService.user.findUnique({ where });
    return !!user;
  }
}
