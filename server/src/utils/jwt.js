import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(payload, expiresIn = env.JWT.EXPIRES_IN) {
  return jwt.sign(payload, env.JWT.SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, env.JWT.SECRET);
  } catch (error) {
    return null;
  }
}
