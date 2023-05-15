import { verifyToken } from './../helpers/generateToken';

const checkOut = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token)
    console.log(tokenData);
    if(tokenData.codigo) {
      next()
    } else {
      res.status(409)
      res.send({ error: 'No autorizado' })
    }
  } catch (error) {
    console.log(error)
    res.status(409)
    res.send({ error: 'No autorizado' })
  }
};