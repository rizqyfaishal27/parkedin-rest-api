import jwt from 'jsonwebtoken';
import { isNull, isUndefined } from 'lodash';
import { jwtAdminSecret } from '../../config/config';
import Admin from '../models/admin.model.js';


/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const login = ({ body: { email, password }}, res, next) =>
  Admin.findOne({ email })
    .then((admin) => admin || res.rest.unauthorized())
    .then((admin) => admin.authenticate(password))
    .then((authenticated_admin) => authenticated_admin || res.rest.unauthorized())
    .then((admin) => ({
      token: jwt.sign({ id: admin.id }, jwtAdminSecret),
      admin: admin.view()
    }))
    .then((result) => res.rest.success(result))
    .catch(next)
  


