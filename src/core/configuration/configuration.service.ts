import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigurationService {
  protected readonly envConfig: { [key: string]: string };

  constructor() {
    dotenv.config();
    this.envConfig = this.validateInput(process.env);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      JWT_SECRET: Joi.string().required(),
    }).options({
      stripUnknown: true,
    });

    const { error, value } = envVarsSchema.validate(envConfig);

    if (error) {
      console.log(`Config validation error: ${error.message}`);
      process.exit(1);
    }
    return value;
  }
}
