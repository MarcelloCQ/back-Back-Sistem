import { getConnection } from '../database/db.conection';
import { encrypt } from '../helpers/handleBcrypt';


const getWorkers = async(req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM workers");
    res.json(result.rows);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getWorker = async(req, res) => {
  try {
    const codigo = [req.params.codigo];
    const queryLenguage = "SELECT * FROM workers WHERE codigo = $1";
    const connection = await getConnection();
    const result = await connection.query(queryLenguage, codigo);
    res.json(result.rows);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const insertWorker = async(req, res) => {
  try {
    const { nombres, apellidos, rol, id_rol, puesto, usuario, salario, clave } = req.body;

    if(nombres === undefined || apellidos === undefined || rol === undefined || id_rol === undefined || puesto === undefined || usuario === undefined || salario === undefined || clave === undefined) {
      res.status(400).json({message: "Bad request. Please, fill all field."});
    }

    const claveHash = await encrypt(clave);

    const data = [nombres, apellidos, rol, id_rol, puesto, usuario, salario, claveHash];
    const queryLenguage = 'INSERT INTO workers(nombres, apellidos, rol, id_rol, puesto, usuario, salario, clave) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
    const connection = await getConnection();
    await connection.query(queryLenguage, data);
    return res.json({ message: "Credential added" });
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteWorker = async(req, res) => {
  try{
    const codigo = [req.params.codigo];
    const queryLenguage = 'DELETE FROM workers WHERE codigo = $1';
    const connection = await getConnection();
    await connection.query(queryLenguage, codigo);
    res.json({message: 'The user selected was delete.'});
  }catch(err){
    res.status(500);
    res.send(error.message);
  }
};

const updateWorker = async(req, res) => {
  try{
    const { codigo } = req.params;
    const { nombres, apellidos, rol, id_rol, puesto, usuario, salario, clave } = req.body;

    const queryLenguage = 'UPDATE workers SET nombres = $1, apellidos = $2, rol = $3, id_rol = $4, puesto = $5, usuario = $6, salario = $7, clave = $8 WHERE codigo = $9';

    if(nombres === undefined || apellidos === undefined || rol === undefined || id_rol === undefined || puesto === undefined || usuario === undefined || salario === undefined || clave === undefined ) {
      res.status(400).json({message: "Bad request. Please, fill all field."});
    }

    const claveHash = await encrypt(clave);
    const data = [nombres, apellidos, rol, id_rol, puesto, usuario, salario, claveHash, codigo];
    
    const connection = await getConnection();
    await connection.query(queryLenguage, data);
    res.json({message: 'The user selected was update'});
  }catch (error){
    res.status(500);
    res.send(error.message);
  }
}

export const methods = {
  getWorkers,
  getWorker,
  insertWorker,
  deleteWorker,
  updateWorker
};
