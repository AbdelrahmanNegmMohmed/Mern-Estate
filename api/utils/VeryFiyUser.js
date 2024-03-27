import jwt from 'jsonwebtoken';
import {errorHandelar} from './error.js' 

export const veryToken = (request, response, next) => {
  const token = request.cookies.access_token;

  if (!token) return next(errorHandelar(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandelar(403, 'Forbidden'));

    request.user = user;
    next();
  });
};