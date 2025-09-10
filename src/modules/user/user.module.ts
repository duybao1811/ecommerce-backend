import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Wishlist } from 'src/modules/wishlist/wishlist.entity';
import { UserRepository } from './user.repo';
import { Product } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wishlist, Product])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
