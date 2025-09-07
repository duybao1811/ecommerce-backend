import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Wishlist } from '../wishlist/wishlist.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'jsonb', nullable: true })
  attributes: Record<string, any>;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product, { cascade: true })
  wishlists: Wishlist[];
}
