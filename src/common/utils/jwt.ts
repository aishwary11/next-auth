import jwt from 'jsonwebtoken';
import constant from '../constant';
const SECRET_KEY = process.env.SECRET_KEY || '';
export const generateJWT = (payload: any) => jwt.sign(payload, SECRET_KEY, { expiresIn: constant.jwtExpire });
export const verifyJWT = (token: any) => jwt.verify(token, SECRET_KEY);
