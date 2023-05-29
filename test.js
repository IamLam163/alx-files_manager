import { createClient } from "redis";
import { promisify } from "util";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isConnected = true;

    this.client.on('error', (err) => {
      console.log('Redis client connection failed', err.toString())
      this.isConnected = false;
    });

    this.client.on('connected', () => {
      console.log('Redis client is connected')
      this.isConnected = true;
    });
  }

  isAlive() {
    return this.isConnected;
  }

  async get(key) {
    getAsync = promisify(this.client.get).bind(this.client);
    const value = await getAsync(key);
    return value;
  }
}
