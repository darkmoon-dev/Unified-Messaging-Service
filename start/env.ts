import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  LOG_LEVEL: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring http server
  |----------------------------------------------------------
  */
  PORT: Env.schema.number(),
  HOST: Env.schema.string({ format: 'host' }),

  /*
  |----------------------------------------------------------
  | Variables for configuring application
  |----------------------------------------------------------
  */
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),

  APP_DESCRIPTION: Env.schema.string.optional(),

  /*
  |----------------------------------------------------------
  | Variables for configuring rabbitMq client
  |----------------------------------------------------------
  */
  RABBITMQ_ENABLED: Env.schema.boolean(),
  RABBITMQ_HOST: Env.schema.string({ format: 'host' }),
  RABBITMQ_PORT: Env.schema.number(),
  RABBITMQ_USER: Env.schema.string(),
  RABBITMQ_PASSWORD: Env.schema.string(),

  /*
 |----------------------------------------------------------
 | Variables for configuring mail client
 |----------------------------------------------------------
 */
  SMTP_ENABLED: Env.schema.boolean(),
  SMTP_HOST: Env.schema.string({ format: 'host' }),
  SMTP_PORT: Env.schema.number(),
  SMTP_USERNAME: Env.schema.string(),
  SMTP_PASSWORD: Env.schema.string(),
  SMTP_SECURE: Env.schema.boolean(),
  SMTP_FROM: Env.schema.string({ format: 'email' }),
  SMTP_FROM_NAME: Env.schema.string(),
  SMTP_REJECT_UNAUTHORIZED: Env.schema.boolean(),
})
