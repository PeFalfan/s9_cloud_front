export const environment = {
  production: true,
  msalConfig: {
    auth: {
      clientId: 'ENTER_CLIENT_ID',
      authority: 'ENTER_AUTHORITY',
      knownAuthorities: 'ENTER_KNOWN_AUTHORITIES',
    },
  },
  apiConfig: {
    scopes: ['ENTER_SCOPE'],
    uri: 'ENTER_URI',
  },
};
