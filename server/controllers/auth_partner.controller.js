import jwt from 'jsonwebtoken';
import { jwtPartnerSecret } from '../../config/config';
import Partner from '../models/partner.model.js';


/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const login = ({ body: { email, password }}, res, next) =>
  Partner.findOne({ email })
    .then((partner) => partner || res.rest.unauthorized())
    .then((partner) => partner.isAccepted ? partner : res.rest.unauthorized())
    .then((partner) => partner.authenticate(password))
    .then((authenticated_partner) => authenticated_partner || res.rest.unauthorized())
    .then((partner) => ({
      token: jwt.sign({ id: partner.id }, jwtPartnerSecret),
      partner: partner.view()
    }))
    .then((result) => res.rest.success(result))
    .catch(next)
  


