import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';

// Configuration module
const ConfigurationModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [appConfig],
  envFilePath: ['.env'],
});

@Module({
  imports: [ConfigurationModule, AuthModule],
})
export class AppModule {}
