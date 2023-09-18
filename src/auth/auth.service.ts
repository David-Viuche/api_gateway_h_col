import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/database/prisma.service';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private readonly jwtService: JwtService,) { }
  public async login(userLoginBody: LoginAuthDto) {
    const { pass, email } = userLoginBody;

    const userExist = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!userExist) throw new HttpException('Username does not exist', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(pass, userExist.pass);
    if (!isCheck)
      throw new HttpException('Password is incorrect', HttpStatus.CONFLICT);

    const payload = {
      id: userExist.userId,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }

  public async register(userBody: RegisterAuthDto) {
    const { pass, email } = userBody;

    const existingEmailUser = await this.prisma.user.findUnique({ where: { email } });

    if (existingEmailUser) {
      throw new HttpException('There is already a user registered with this email', HttpStatus.BAD_REQUEST);
    }

    const passHash = await generateHash(pass)

    const newUser = await this.prisma.user.create(
      {
        data: {
          email,
          pass: passHash,
        }
      });

    const userRes = {
      userId: newUser.userId,
      email: newUser.email,
    }

    return userRes;
  }
}
