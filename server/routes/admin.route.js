import express from 'express';
import validate from 'express-validation';
import jwtCheck from 'express-jwt';
import { 
  createAdmin, 
  updateAdmin 
} from '../validations/admin.validation';
import {
  acceptPartner as acceptPartnerValidation,
} from '../validations/partner.validation';
import { 
  create, 
  list, 
  update, 
  remove, 
  load, 
  get,
  acceptPartner
} from '../controllers/admin.controller';
import {
  load as loadPartner
} from '../controllers/partner.controller';
import { 
  masterKey as key, 
  jwtAdminSecret as secret 
} from '../../config/config';


const masterKeyMatch = ({ body:{ masterKey }}, res, next) => 
  (masterKey == key) ? next() : res.rest.unauthorized()

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/admins - Get list of admins */
  .get(jwtCheck({ secret }), list)

  /** POST /api/admins - Create new admin */
  .post(validate(createAdmin), masterKeyMatch, create);

router.route('/:adminId')
  /** GET /api/admins/:userId - Get admin */
  .get(jwtCheck({ secret }),get)

  /** PUT /api/admins/:adminId - Update admin */
  .put(validate(updateAdmin), jwtCheck({ secret }), update)

  /** DELETE /api/admins/:adminId - Delete admin */
  .delete(jwtCheck({ secret }), remove);

router.route('/partners/:partnerId/accept')
  .put(jwtCheck({ secret }), validate(acceptPartnerValidation), acceptPartner)

/** Load admin when API with adminId route parameter is hit */
router.param('adminId', load);
router.param('partnerId', loadPartner)

export default router;
