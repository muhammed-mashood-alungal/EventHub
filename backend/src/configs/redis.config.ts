
import { env } from './env.config';
import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType;

function connectRedis() {
  redisClient = createClient({
    username: env.REDIS_USERNAME as string,
    password: env.REDIS_PASSWORD as string,
    socket: {
      host: env.REDIS_HOST as string,
      port: Number(env.REDIS_PORT),
      connectTimeout: 30000,
      reconnectStrategy: (retries: number) => {
        if (retries > 5) {
          console.log('Max Redis reconnect attempts reached');
          return new Error('Max reconnect attempts reached');
        }
        return Math.min(retries * 100, 2000); 
      },
    },
  });

  
  redisClient.on('ready', () => {
    console.log('Connected to Redis');
  });

  redisClient.on('error', (err: Error) => {
    console.error('Redis connection error:', err);
  });


  redisClient.connect().catch((err: Error) => {
    console.error('Redis failed to connect:', err);
  });
}

export { connectRedis, redisClient };
