import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }
  async createUser({
    fullName,
    email,
    password,
    phoneNumber,
    address,
  }: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
  }): Promise<User> {
    return this.userRepo.createUser({
      fullName,
      email,
      password,
      phoneNumber,
      address,
    });
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userRepo.findByIdWithWishlist(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
