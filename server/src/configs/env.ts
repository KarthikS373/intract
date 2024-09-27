import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({});

const environmentSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().positive().required(),
    BASE_URL: Joi.string().required().description('Base URL of the API'),
    API_SECRET: Joi.string().required().description('API secret key'),
  })
  .unknown();

const { value: env, error } = environmentSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: env.NODE_ENV,
  base: {
    url: env.BASE_URL,
  },
  port: env.PORT,
  api: {
    secret: env.API_SECRET,
  },
};
