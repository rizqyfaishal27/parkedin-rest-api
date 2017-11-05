import express from 'express';
import validate from 'express-validation';
import jwtCheck from 'express-jwt';
import { 
  createPartner, 
  updatePartner, 
  getPartner, 
  deletePartner, 
} from '../validations/partner.validation';

import { 
  create, 
  list, 
  update, 
  remove, 
  load, 
  get 
} from '../controllers/partner.controller';
import { 
  jwtPartnerSecret as secret, 
  jwtAdminSecret as secretAdmin 
} from '../../config/config';

const matchIdWithJWTID = (req, res, next) => 
  (req.params.partnerId == req.partner.id) ? next() : res.rest.badRequest()


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/partners - Get list of partners */
  .get(jwtCheck({ secret: secretAdmin }), list)

  /** POST /api/partners - Create new partner */
  .post(validate(createPartner), create);

router.route('/:partnerId')
  /** GET /api/partners/:partnerId - Get partner */
  .get(jwtCheck({ secret }), validate(getPartner), matchIdWithJWTID, get)

  /** PUT /api/partners/:partnerId - Update partner */
  .put(jwtCheck({ secret }), validate(updatePartner), matchIdWithJWTID, update)

  /** DELETE /api/partners/:partnerId - Delete partner */
  .delete(jwtCheck({ secret: secretAdmin }), validate(deletePartner), matchIdWithJWTID, remove);

/** Load user when API with partnerId route parameter is hit */
router.param('partnerId', load);

export default router;
