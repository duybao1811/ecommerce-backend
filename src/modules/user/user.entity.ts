import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Wishlist } from '../wishlist/wishlist.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 100 })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default: '/default-avatar.png',
  })
  avatar: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user, { cascade: true })
  wishlists: Wishlist[];
}
