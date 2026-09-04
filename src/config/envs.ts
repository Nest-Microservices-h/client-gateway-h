import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const validationResult = envsSchema.validate(process.env);

if (validationResult.error) {
  throw new Error(
    `Invalid environment variables: ${validationResult.error.message}`,
  );
}

const envVars: EnvVars = validationResult.value;

export const envs = {
  PORT: envVars.PORT,
  PRODUCTS_MICROSERVICE_HOST: envVars.PRODUCTS_MICROSERVICE_HOST,
  PRODUCTS_MICROSERVICE_PORT: envVars.PRODUCTS_MICROSERVICE_PORT,
  ORDERS_MICROSERVICE_HOST: envVars.ORDERS_MICROSERVICE_HOST,
  ORDERS_MICROSERVICE_PORT: envVars.ORDERS_MICROSERVICE_PORT,
};
