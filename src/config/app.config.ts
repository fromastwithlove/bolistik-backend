import { registerAs } from '@nestjs/config';
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

type AppConfig = {
  nodeEnv: Environment;
  port: number;
  jwtSecret: string;
};

enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  APP_PORT: number;

  @IsString()
  JWT_SECRET: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.APP_PORT, 10),
    jwtSecret: process.env.JWT_SECRET,
  };
});
