import get_env from '$/utilities/get_env';

export default {
  redis: {
    host: get_env('REDIS_HOST', '127.0.0.1'),
    port: get_env('REDIS_PORT', 6379)
  }
};
