// pages/api/auth/login.js
import { generateJWT } from '@/utils/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.username === 'admin' && req.body.password === 'password123') {
    const user = { username: 'admin', roles: ['admin'] };
    const token = generateJWT(user);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
