import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
