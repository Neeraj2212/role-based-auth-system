import redisClient from '@/db';
import { Repository, Schema } from 'redis-om';

const accessSchema = new Schema('access', {
  role: { type: 'string' },
  permissions: { type: 'string[]' },
});

const accessModel = new Repository(accessSchema, redisClient);

export default accessModel;
