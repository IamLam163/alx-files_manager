import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.isMongoConnected = false;
    this.connectMongodb();
  }

  async connectMongodb() {
    try {
      await this.client.connect();
      this.isMongoConnected = true;
      console.log('Mongodb is Connected');
    } catch (err) {
      console.log('Error', err);
    }
  }

  isAlive() {
    return this.isMongoConnected;
  }

  async nbUsers() {
    const nbUsers = await this.client
      .db('files_manager')
      .collection('users')
      .countDocuments();
    return nbUsers;
  }

  async nbFiles() {
    const nbFiles = await this.client.db('files_manager').collection('files').countDocuments();
    return nbFiles;
  }
}

export const dbClient = new DBClient();
export default dbClient;
