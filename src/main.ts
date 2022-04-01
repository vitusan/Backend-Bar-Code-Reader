import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  if (configService.get('ENABLE_CORS') === 'true') {
    const corsOptions = {
      origin: '*',
      methods: ['GET','POST'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: false,
      allowedHeaders: 'Content-Type, Accept'
    };
    app.enableCors(corsOptions);
  }

  await app.listen(process.env.PORT || 3000);

}
bootstrap();
