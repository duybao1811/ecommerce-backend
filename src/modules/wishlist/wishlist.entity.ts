import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity('wishlists')
export class Wishlist extends BaseEntity {
  @ManyToOne(() => User, (user) => user.wishlists, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, (product) => product.wishlists, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
