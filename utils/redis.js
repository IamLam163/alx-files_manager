import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isConnected = true;

    this.client.on('error', (err) => {
      console.log('Redis client error:', err.toString());
      this.isConnected = false;
    });
    this.client.on('connect', () => {
      console.log('Redis client is connected');
      this.isConnected = true;
    });
  }

  isAlive() {
    return this.isConnected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const value = await getAsync(key);
    return value;
  }

  async set(key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, value, 'EX', duration);
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
