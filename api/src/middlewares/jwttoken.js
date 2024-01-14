import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.js';

const Jwttoken = async (data) => {
  const token = jwt.sign(data, envConfig.jwtKey);
  return token;
};

export default Jwttoken;
