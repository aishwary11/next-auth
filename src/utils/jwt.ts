import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const generateJWT = (payload: any) => jwt.sign(payload, SECRET_KEY!);

export const verifyJWT = (token: any) => {
  try {
    return jwt.verify(token, SECRET_KEY!);
  } catch (error) {
    throw new Error('Invalid Token');
  }
};