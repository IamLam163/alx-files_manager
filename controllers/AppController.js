import { redisClient } from '../utils/redis';
import { dbClient } from '../utils/db';

const APPController = {
  getStatus(req, res) {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    res.status(200).json({ redis, db });
  },

  async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    res.status(200).json({ users, files });
  },
};

export default APPController;
