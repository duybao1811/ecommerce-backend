import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }
  async findById(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }
  async createUser({
    fullName,
    email,
    password,
    phoneNumber,
    address,
  }: RegisterDto): Promise<User> {
    return this.userRepo.createUser({
      fullName,
      email,
      password,
      phoneNumber,
      address,
    });
  }

  async getProfile(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepo.findByIdWithWishlist(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateAvatar(
    userId: string,
    avatarUrl: string,
  ): Promise<UserResponseDto> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.avatar = avatarUrl;
    await this.userRepo.updateUser(userId, user);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateUserProfile(
    userId: string,
    updateData: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateData);
    await this.userRepo.updateUser(userId, user);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
