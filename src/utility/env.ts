import 'dotenv/config';
import {z} from 'zod';

const envSchema = z.object({
    USER_NAME: z.email('USER_Name must be a valid email address in .env file'),
    PASSWORD: z.string().min(1, 'Password field cannot be empty in .env file')
});

const parseEnv = envSchema.safeParse(process.env);

if (!parseEnv.success) {
  console.error('❌ Environment validation failed:');
  console.error(JSON.stringify(parseEnv.error, null, 2));
  process.exit(1);
}

export const env = parseEnv.data;