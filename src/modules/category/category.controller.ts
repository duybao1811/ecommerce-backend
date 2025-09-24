import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ImageValidationPipe } from '../../common/pipes/image-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async register() {
    const categories = await this.categoryService.getAllCategories();
    return { categories };
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('icon', multerConfig))
  async createCategory(
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
    @Body() body: any,
  ) {
    const data = {
      name: body.name,
      description: body.description,
      parentId: body.parentId,
      slug: body.slug,
      ...(file && { icon: file.path }),
    };

    const category = await this.categoryService.createCategory(data);
    return { category };
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: string) {
    const result = await this.categoryService.deleteCategory(id);
    return { result };
  }
}
