import jwt from 'jsonwebtoken';
import { isNull, isUndefined } from 'lodash';
import { jwtSecret } from '../../config/config';
import User from '../models/user.model.js';

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const login = ({ body:{ email, password }}, res, next) =>
  User.findOne({ email })
    .then((user) => user || res.rest.unauthorized())
    .then((user) => user.authenticate(password))
    .then((authenticate_user) => authenticate_user || res.rest.unauthorized())
    .then((user) => ({
      token: jwt.sign({ id: user.id }, jwtSecret),
      user: user.view()
    }))
    .then((result) => res.rest.success(result))
    .catch(next)
  


