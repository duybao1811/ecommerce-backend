// src/common/pipes/image-validation.pipe.ts
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Unsupported file type ${file.mimetype}. Allowed: ${allowedTypes.join(', ')}`,
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('File too large. Max size is 5MB');
    }

    return file;
  }
}
