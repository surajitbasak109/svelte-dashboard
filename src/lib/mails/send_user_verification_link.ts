import generateEmailTemplate from '$/utilities/generate_email_template';
import get_env from '$/utilities/get_env';
import Mailer from '$/utilities/mailer';

export default async function send_user_verification_link(email: string, verificationLink: string) {
  const mailer = new Mailer();
  const html = generateEmailTemplate('verify_email', {
    title: 'Verify your email',
    url: verificationLink,
    appName: get_env('APP_NAME')
  });

  const returnedValue = await mailer.sendMail({
    to: email,
    html,
    subject: 'Verify your email address'
  });

  return returnedValue;
}
