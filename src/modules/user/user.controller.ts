import {
  Controller,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  Post,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../../common/pipes/image-validation.pipe';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

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
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
  ) {
    return this.userService.updateAvatar(id, file.path);
  }
}
