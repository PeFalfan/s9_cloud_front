export const environment = {
  production: true,
  msalConfig: {
    auth: {
      clientId: 'f782167d-f8c2-4e71-a447-eb7d4f9b9962',
      authority: 'https://duocazureeft.b2clogin.com/duocazureeft.onmicrosoft.com/B2C_1_DuocEFT/v2.0',
      knownAuthorities: ['duocazureeft.b2clogin.com'],
    },
  },
  apiConfig: {
    scopes: ['openid'],
    uri: 'https://graph.microsoft.com/openid',
  },
};

