import mail from '$/config/mail';
import nodemailer from 'nodemailer';
import get_env from './get_env';

type MailOptions = {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export class Mailer {
  transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = this.createTransporter();
  }

  private createTransporter(): nodemailer.Transporter {
    const {
      mailers: {
        smtp: { host, port, username, password }
      }
    } = mail;
    return nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: {
        user: username,
        pass: password
      }
    });
  }

  async sendMail(mailOptions: MailOptions) {
    if (!mailOptions.from) {
      const { name, address } = mail.from;
      mailOptions.from = get_env(`"${name}" <${address}>`) as string;
    }
    return this.transporter.sendMail(mailOptions);
  }
}
