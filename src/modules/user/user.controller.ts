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
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../../common/pipes/image-validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const userId = req.user!.sub;
    const user = await this.userService.getProfile(userId);
    return { user };
  }

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
  ) {
    return this.userService.updateAvatar(id, file.path);
  }
}
