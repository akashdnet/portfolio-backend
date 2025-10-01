import dotenv from "dotenv";
import type { StringValue } from "ms"

dotenv.config();

interface TEnvList {
  PORT: string;
  NODE_ENV: "development" | "production";
  DB_URI: string;
  BCRYPT_SALT_ROUND: number;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: StringValue;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: StringValue;
  EXPRESS_SESSION_SECRET: string;
  AFTER_GOOGLE_LOGIN_SUCCESS_URL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_UPLOAD_PRESET: string;
  FRONT_END_SITE: string;
  FRONT_END_SITE_LOCAL: string;
  FRONT_END_SITE_PRODUCTION: string;
}

const loadEnvList = (): TEnvList => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "NODE_ENV",
    "DB_URI",
    "BCRYPT_SALT_ROUND",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES",
    "EXPRESS_SESSION_SECRET",
    "AFTER_GOOGLE_LOGIN_SUCCESS_URL",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "CLOUDINARY_UPLOAD_PRESET",
    "FRONT_END_SITE",
    "FRONT_END_SITE_LOCAL",
    "FRONT_END_SITE_PRODUCTION",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing env value of : ${key} `);
    }
  });

  return {
    PORT: process.env.PORT!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    DB_URI: process.env.DB_URI!,
    BCRYPT_SALT_ROUND: Number(process.env.BCRYPT_SALT_ROUND),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL!,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as StringValue,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as StringValue,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET!,
    AFTER_GOOGLE_LOGIN_SUCCESS_URL: process.env.AFTER_GOOGLE_LOGIN_SUCCESS_URL!,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET!,
    FRONT_END_SITE: process.env.FRONT_END_SITE!,
    FRONT_END_SITE_LOCAL: process.env.FRONT_END_SITE_LOCAL!,
    FRONT_END_SITE_PRODUCTION: process.env.FRONT_END_SITE_PRODUCTION!,
  };
};

export const envList = loadEnvList();