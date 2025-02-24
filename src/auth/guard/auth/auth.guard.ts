import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { env } from 'process';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { headers }: Request = context.switchToHttp().getRequest();
    const { authorization } = headers;
    if (!authorization)
      throw new UnauthorizedException(`Not exist authorization`);
    try {
      await this.jwtService.verifyAsync(
        authorization,
        {
          secret: env.JWT_SECRET ?? '',
        }
      )
    } catch (error) {
      throw new UnauthorizedException(`Not is valid authorization`);
    }
    return true;
  }
}
