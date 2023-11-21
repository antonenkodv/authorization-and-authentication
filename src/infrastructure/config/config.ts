import { env } from 'process';

export default () => ({
  STAGE: env.NODE_ENV,
  SERVER: {
    PORT: parseInt(env.PORT),
  },
  JWT: {
    SECRET: env.JWT_SECRET,
    EXPIRES_IN: env.JWT_EXPIRES_IN,
  },
});
