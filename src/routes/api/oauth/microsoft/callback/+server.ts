// import MicrosoftAuth from '$/services/microsoft/auth';
import MicrosoftAuth from '$/services/microsoft/auth';
import { type RequestHandler } from '@sveltejs/kit';

const { json } = Response;

export const GET: RequestHandler = async (event) => {
  console.log(event);
  const {
    url: { searchParams }
  } = event;
  console.log(searchParams);
  if (searchParams.has('code')) {
    const code = searchParams.get('code');

    const auth = new MicrosoftAuth()
      .setClientId(process.env.MS_CLIENT_ID ?? '')
      .setClientSecret(process.env.MS_CLIENT_SECRET ?? '')
      .setRedirectUri(process.env.MS_REDIRECT_URI ?? '')
      .setScopes(['openid', 'profile', 'offline_access', 'Calendars.Read']);

    const token = await auth.handleAuthCode(code ?? '');

    console.log(token);

    if (token) {
      return json({
        success: true,
        message: 'Successfully integrated',
        data: token
      });
    } else {
      return json(
        {
          error: true,
          message: 'Unable to authenticate'
        },
        { status: 400 }
      );
    }
  } else {
    return json({
      error: true,
      message: searchParams.get('error_description')
    });
  }
};
