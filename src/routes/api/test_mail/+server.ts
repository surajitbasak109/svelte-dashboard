import { Mailer } from '$/utilities/mailer';
export const GET = async () => {
  const mailer = new Mailer();
  try {
    const sendingMailResponse = await mailer.sendMail({
      to: 'surajitbasak109@gmail.com',
      subject: 'Test from CRM App #3',
      html: '<h1>Hello world!</h1><p>This is awesome!</p>'
    });

    console.log(sendingMailResponse);
    return Response.json({ sendingMailResponse });
  } catch (error) {
    console.error(error);
    return Response.json(error);
  }
};
