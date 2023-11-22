import { REDIS_URI } from '@/config';
import * as redis from 'redis';
import { seedRedis } from './seed';

// Initialize redis client
const redisClient = redis.createClient({ url: REDIS_URI });
redisClient.on('error', err => {
  console.error('Redis Client Error', err);
});

redisClient.on('connect', () => {
  console.log('Redis Client Connected');
});

export default redisClient;
