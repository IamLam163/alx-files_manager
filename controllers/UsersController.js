import crypto from 'crypto';
import dbClient from '../utils/db';

function hashPassword(password) {
  const sha1Hash = crypto.createHash('sha1');
  sha1Hash.update(password);
  const hashedPassword = sha1Hash.digest('hex');
  return hashedPassword;
}

const UsersController = {
  async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
    }

    let existingUser;
    try {
      existingUser = await dbClient.findOne({ email });
    } catch (err) {
      console.log(err.toString());
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (existingUser) {
      res.status(400).json({ error: 'Already exist' });
    }
    const hashedPassword = hashPassword(password);
    const user = { email, hashedPassword };
    try {
      await dbClient.save(user);
      return res.status(201).json({ id: user, email });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default UsersController;
