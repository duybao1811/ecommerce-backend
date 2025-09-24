import {
  Controller,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  Post,
  UploadedFile,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../../common/pipes/image-validation.pipe';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { multerConfig } from '../../config/multer.config';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const userId = req.user!.sub;
    const user = await this.userService.getProfile(userId);
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
  ) {
    return this.userService.updateAvatar(id, file.path);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/profile')
  async updateProfile(@Req() req: Request, @Body() dto: UpdateProfileDto) {
    const userId = req.user!.sub;
    const user = await this.userService.updateUserProfile(userId, dto);
    return { user };
  }
}
