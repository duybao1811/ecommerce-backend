import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Wishlist } from 'src/modules/wishlist/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Wishlist)
    private readonly wishlistRepo: Repository<Wishlist>,
  ) {}

  findById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  findByIdWithWishlist(id: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      relations: ['wishlists'],
    });
  }

  createUser(userData: RegisterDto): Promise<User> {
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }

  async updateUser(
    userId: string,
    updateData: UpdateProfileDto,
  ): Promise<void> {
    await this.userRepo.update(userId, { ...updateData });
  }

  getWishlist(userId: string): Promise<Wishlist[]> {
    return this.wishlistRepo.find({
      where: { user: { id: userId } },
    });
  }
}
