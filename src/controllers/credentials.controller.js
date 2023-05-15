import { getConnection } from '../database/db.conection';

const getCredentials = async() => {
  const connection = await getConnection();
};

const getCredential = async() => {
  const connection = await getConnection();
};

const insertCredential = async() => {
  const connection = await getConnection();
};

const deleteCredential = async() => {
  const connection = await getConnection();
};

const updateCredential = async() => {
  const connection = await getConnection();
};

export const methods = {
  getCredentials,
  getCredential,
  insertCredential,
  deleteCredential,
  updateCredential
};