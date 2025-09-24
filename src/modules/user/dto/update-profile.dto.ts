import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  address?: string;
}
