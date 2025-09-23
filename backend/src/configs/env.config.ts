import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production"] }),
  PORT: num({ default: 3000 }),
  MONGO_URL: str(),
  JWT_SECRET: str(),
  REDIS_HOST: str(),
  REDIS_PORT: num(),
  REDIS_USERNAME: str(),
  REDIS_PASSWORD: str(),
  CLIENT_URL: str(),
});
