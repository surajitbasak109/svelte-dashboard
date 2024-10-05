import get_env from '$/utilities/get_env';

export default {
  mailers: {
    smtp: {
      host: get_env('MAIL_HOST', 'smtp.mailgun.org'),
      port: get_env('MAIL_PORT', 587),
      username: get_env('MAIL_USERNAME'),
      password: get_env('MAIL_PASSWORD')
    }
  },
  from: {
    address: get_env('MAIL_FROM_ADDRESS', 'hello@example.com'),
    name: get_env('MAIL_FROM_NAME', 'Example')
  }
};
