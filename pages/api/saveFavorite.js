import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, favorites } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'User email is required.' });
      }

      await dbConnect();

      // Find the user by email or create a new one
      const user = await User.findOneAndUpdate(
        { email },
        { $set: { favorites } },
        { new: true, upsert: true }
      );

      res.status(200).json({ message: 'Favorites saved successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error saving favorites' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
