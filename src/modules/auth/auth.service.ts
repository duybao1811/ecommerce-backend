import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    fullName: string,
    email: string,
    password: string,
    phoneNumber?: string,
    address?: string,
  ): Promise<UserResponseDto> {
    const existing = await this.userService.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.createUser({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    return plainToInstance(UserResponseDto, newUser, {
      excludeExtraneousValues: true,
    });
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    user: UserResponseDto;
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('auth.JWT_ACCESS_SECRET'),
      expiresIn: '15m', // Access token 15 phút
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('auth.JWT_REFRESH_SECRET'),
      expiresIn: '7d', // Refresh token 7 ngày
    });

    const userDto = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return { user: userDto, accessToken, refreshToken };
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('auth.JWT_REFRESH_SECRET'),
      });

      const user = await this.userService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newAccessToken = this.jwtService.sign(
        { sub: user.id, email: user.email },
        {
          secret: this.configService.get<string>('auth.JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      );

      return { accessToken: newAccessToken };
    } catch (e) {
      console.log(e);
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}
