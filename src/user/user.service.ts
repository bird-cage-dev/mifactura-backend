import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { Credential, Prisma } from '@prisma/client';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto, credential: Credential) {
    const { identification, name, phone, identificationType, profile } = createUserDto;
    return await this.prismaService.user.create(
      {
        data: {
          email: credential.username,
          identification,
          identificationType,
          name,
          profile,
          phone,
          credentialId: credential.id
        },
        omit: {
          credentialId: true,
        }
      }
    )
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneByCredentialId(credentialId: string) {
    const user = await this.prismaService.user.findUnique({ where: { credentialId } });
    if (!user)
      throw new BadRequestException(`Not exist user with credentialId: ${credentialId}`);
    return user;
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user)
      throw new BadRequestException(`Not exist user with id: ${id}`);
    return user;
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} user`;
  // }
  async exists(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prismaService.user.findUnique({ where });
    return !!user;
  }
}
