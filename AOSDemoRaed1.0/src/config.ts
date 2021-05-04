// Mapper for environment variables
export const environment = "development";
export const port = 3000;

export const db = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_USER_PWD || '',
};

export const corsUrl = "*";

export const tokenInfo = {
  accessTokenValidityDays: 30,
  refreshTokenValidityDays: 120,
  issuer: 'medraedbesbes',
  audience: 'medraedbesbes',
};

export const logDirectory = "C:\logs";
