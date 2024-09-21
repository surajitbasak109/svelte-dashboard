import MicrosoftAuth from '$/services/microsoft/auth';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const authUrl = new MicrosoftAuth()
    .setClientId(process.env.MS_CLIENT_ID ?? '')
    .setRedirectUri(process.env.MS_REDIRECT_URI ?? '')
    .setScopes(['openid', 'profile', 'offline_access', 'Calendars.Read'])
    .getAuthUrl();

  //   return Response.json({ authUrl: decodeURIComponent(authUrl) });

  redirect(302, authUrl);
};
