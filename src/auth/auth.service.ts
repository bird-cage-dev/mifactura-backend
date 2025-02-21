import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth-dto';
import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {

  constructor(
    private prismaService: PrismaService,
    private userService: UserService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { auth, phone } = createUserDto;
    const { username, password } = auth;

    const existsCredential = await this.prismaService.credential.findUnique({ where: { username } });
    if (existsCredential)
      throw new BadRequestException(`Error in create credential, exists username: ${username}`);
    const existsPhone = await this.userService.exists({ phone });
    if (existsPhone)
      throw new BadRequestException(`Error in create user, exists phone: ${phone}`)
    const encryptPassword = await hash(password, 10);
    const credential = await this.prismaService.credential.create({ data: { username, password: encryptPassword } });
    return await this.userService.create(createUserDto, credential);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;
    const credential = await this.prismaService.credential.findUnique({ where: { username } });
    if (!credential)
      throw new BadRequestException(`Error in login, not exists username: ${username}`);
    const isEqualPassword = await compare(password, credential.password);
    if (isEqualPassword)
      return this.userService.findOneByCredentialId(credential.id);
    throw new BadRequestException(`Error in credentials`);
  }
  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
