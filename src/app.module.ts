import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { UsersModule } from './users/users.module';

// Configuration module
const ConfigurationModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [appConfig, databaseConfig],
  envFilePath: ['.env'],
});

// Database module
const DatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
});

@Module({
  imports: [ConfigurationModule, DatabaseModule, AuthModule, UsersModule],
})
export class AppModule {}
