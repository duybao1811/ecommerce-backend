import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  address?: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
