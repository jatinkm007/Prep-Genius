import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'prep_genius_default_secret_2026', {
    expiresIn: '30d',
  });
};