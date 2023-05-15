import jwt from 'jsonwebtoken';

export const tokenSign = async(user) => {
  return jwt.sign({
    code: user.codigo,
    rol: user.rol
  },
  process.env.JWT_SECRETE,
  {
    expiresIn: "2h"
  });
};

export const verifyToken = async(token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRETE);
  } catch (error) {
    return null
  }
};