import { APP_NAME, APP_URL } from '$env/static/private';

export default {
  name: APP_NAME ?? 'CRM App',
  url: APP_URL ?? 'localhost',
  timezone: 'UTC'
};
