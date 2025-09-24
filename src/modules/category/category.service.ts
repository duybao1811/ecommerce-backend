import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repo';
import { generateSlug, removeFile } from '../../common/utils';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAllCategories() {
    return this.categoryRepo.findAll();
  }

  async createCategory(data: {
    name: string;
    description?: string;
    icon?: string;
    parentId?: string;
    slug?: string;
  }) {
    if (data.parentId) {
      const parentCategory = await this.categoryRepo.findById(data.parentId);
      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
      data['parent'] = parentCategory;
      delete data.parentId;
    }

    const existingName = await this.categoryRepo.findByName(data.name);

    if (existingName) {
      throw new NotFoundException('Category name must be unique');
    }

    data.slug = generateSlug(data.name);

    return this.categoryRepo.createCategory(data);
  }

  async deleteCategory(id: string) {
    const existingCategory = await this.categoryRepo.findById(id);
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }
    if (existingCategory.icon) {
      await removeFile(existingCategory.icon);
    }
    return this.categoryRepo.deleteCategory(id);
  }
}
