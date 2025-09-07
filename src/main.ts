import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  console.log('port', port);
  await app.listen(port || '3000');
  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
