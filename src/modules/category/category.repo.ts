import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  findByName(name: string): Promise<Category | null> {
    return this.categoryRepo.findOne({ where: { name } });
  }

  findById(id: string): Promise<Category | null> {
    return this.categoryRepo.findOne({ where: { id } });
  }

  findBySlug(slug: string): Promise<Category | null> {
    return this.categoryRepo.findOne({ where: { slug } });
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepo.find({ relations: ['children'] });
  }

  createCategory(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepo.create(categoryData);
    return this.categoryRepo.save(category);
  }

  async updateCategory(
    categoryId: string,
    updateData: Partial<Category>,
  ): Promise<void> {
    await this.categoryRepo.update(categoryId, { ...updateData });
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await this.categoryRepo.delete(categoryId);
  }
}
