// Mapper for environment variables
export const environment = "development";
export const port = 3000;

export const db = {
  name: process.env.DB_NAME || 'dbname',
  host: process.env.DB_HOST || 'dbhost',
  port: process.env.DB_PORT || 'dbport',
  user: process.env.DB_USER || 'dbuser',
  password: process.env.DB_USER_PWD || 'dbpassword',
};

export const corsUrl = "*";

export const tokenInfo = {
  accessTokenValidityDays: 30,
  refreshTokenValidityDays: 120,
  issuer: 'medraedbesbes',
  audience: 'medraedbesbes',
};

export const logDirectory = "C:\logs";
