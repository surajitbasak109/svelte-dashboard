/*
https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=7bd805b0-3cd5-4457-b370-20189dbfb848&response_type=code&redirect_uri=http://localhost/redirect?response_mode=query&scope=offline_access User.Read Mail.Read&state=12345
*/

export type MicrosoftAuthOptions = {
  tenantId: string;
  cloudInstanceUri: string;
  clientId?: string | null;
  redirectUri?: string | null;
  clientSecret?: string | null;
  responseMode: string;
  responseType: string;
  scope: string;
};

export default class MicrosoftAuth {
  _options: MicrosoftAuthOptions = {
    tenantId: 'common',
    cloudInstanceUri: 'https://login.microsoftonline.com',
    clientId: null,
    redirectUri: null,
    clientSecret: null,
    responseMode: 'query',
    responseType: 'code',
    scope: 'offline_access'
  };

  authorizePath = 'oauth2/v2.0/authorize';
  requestTokenPath = 'oauth2/v2.0/token';

  _scopes: Array<string> = [];

  constructor(options?: MicrosoftAuthOptions | null) {
    if (options) this._options = { ...this._options, ...options };
  }

  setClientId(clientId: string): MicrosoftAuth {
    this._options.clientId = clientId;
    return this;
  }

  setClientSecret(clientSecret: string): MicrosoftAuth {
    this._options.clientSecret = clientSecret;
    return this;
  }

  setRedirectUri(redirectUri: string): MicrosoftAuth {
    this._options.redirectUri = redirectUri;
    return this;
  }

  setResponseMode(responseMode: string): MicrosoftAuth {
    this._options.responseMode = responseMode;
    return this;
  }

  setScopes(scopes: Array<string> = []): MicrosoftAuth {
    this._scopes = [...this._scopes, ...scopes];
    this._options['scope'] += this._scopes.join(' ');
    return this;
  }

  getAuthUrl() {
    this.validateInput();

    const query = this.getAuthUrlQueryString();
    return this.getAuthEndpoint(this.authorizePath) + '?' + query;
  }

  async handleAuthCode(code: string) {
    const encodedParams = this.getAuthUrlQueryParams();
    encodedParams.set('client_secret', this._options.clientSecret ?? '');
    encodedParams.set('code', code);
    encodedParams.set('grant_type', 'authorization_code');

    const url = this.getAuthEndpoint(this.requestTokenPath);
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: encodedParams
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        console.error(data.error_description);
        return null;
      }

      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  private getScopeString(): string {
    return this._scopes.join(' ');
  }

  private validateInput() {
    if (!this._options.clientId) {
      throw new Error('Client id not specified');
    }
    if (!this._options.redirectUri) {
      throw new Error('Redirect uri not specified');
    }
  }

  private getAuthUrlQueryParams(): URLSearchParams {
    return new URLSearchParams({
      client_id: this._options.clientId ?? '',
      redirect_uri: this._options.redirectUri ?? '',
      response_mode: this._options.responseMode,
      response_type: this._options.responseType,
      scope: this.getScopeString()
    });
  }

  private getAuthUrlQueryString(): string {
    return this.getAuthUrlQueryParams().toString();
  }

  private getAuthEndpoint(requestPath: string) {
    return `${this._options.cloudInstanceUri}/${this._options.tenantId}/${requestPath}`;
  }
}
