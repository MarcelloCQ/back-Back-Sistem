import { compare } from '../helpers/handleBcrypt';
import { getConnection } from '../database/db.conection';
import { tokenSign } from '../helpers/generateToken';


const loginCtrl = async(req, res) => {

  try {
    const maxAge = 2 * 60 * 60 * 1000;
    const { usuario, clave } = req.body;
    const queryLenguage = "SELECT * FROM workers WHERE usuario = $1";
    const data = [usuario]

    if( usuario === undefined || clave === undefined) {
      return res.status(404).json({ error: 'Bad request. Please, fill all field.' })
    }

    const connection = await getConnection();
    const result = await connection.query(queryLenguage, data);
    
    if(!result.rows[0]) {
      return res.status(404).json({ error: 'User invalid' })
    }

    const user = result.rows[0];

    const checkPassword = await compare(clave, result.rows[0].clave);

    const tokenSession = await tokenSign(user);

    if(checkPassword) {
      res.cookie('authcookie', tokenSession, { maxAge })
      return res.send({
        data: user,
        tokenSession
      });      
    }

    throw new Error('passwords do not match');

  } catch (error) {

    if(error.message === 'passwords do not match') {
      return res.status(401).json({ error: 'Invalid Password' });
    } 
    else {
      res.status(500)
      res.send({error: 'Internal Server Error'})
    }

    
  }
};

export const methods = {
  loginCtrl
};