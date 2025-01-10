import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

// Configuration module
const ConfigurationModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [appConfig],
  envFilePath: ['.env'],
});

@Module({
  imports: [ConfigurationModule],
})
export class AppModule {}
