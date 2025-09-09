import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { Wishlist } from 'src/wishlist/wishlist.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  findByIdWithWishlist(id: string): Promise<User | null> {
    return this.findOne({
      where: { id },
      relations: ['wishlists'],
    });
  }

  createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return this.save(user);
  }

  getWishlist(userId: string): Promise<Wishlist[]> {
    return this.dataSource.getRepository(Wishlist).find({
      where: { user: { id: userId } },
    });
  }
}
