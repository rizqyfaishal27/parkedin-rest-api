import express from 'express';
import validate from 'express-validation';
import jwtCheck from 'express-jwt';
import { 
  createBuilding, 
  updateBuilding, 
  getBuilding, 
  deleteBuilding,
  addFloor as addFloorValidation,
  removeFloor as removeFloorValidation
} from '../validations/building.validation';

import { 
  create,
  list,
  update,
  remove,
  load, 
  get,
  addFloor,
  removeFloor,
} from '../controllers/building.controller';

import { 
  jwtSecret as secretUser, 
  jwtAdminSecret as secret,
  jwtPartnerSecret as secretPartner,
} from '../../config/config';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/buildings - Get list of buildings */
  .get(list)

  /** POST /api/buildings - Create new building */
  .post(jwtCheck({ secret: secretPartner }), validate(createBuilding), create);

router.route('/:buildingId')
  /** GET /api/buildings/:buildingId - Get building */
  .get(validate(getBuilding), get)

  /** PUT /api/buildings/:buildingId - Update building */
  .put(jwtCheck({ secret: secretPartner }), validate(updateBuilding), update)

  /** DELETE /api/buildings/:buildingId - Delete building */
  .delete(jwtCheck({ secret: secretPartner }), validate(deleteBuilding), remove)

router.route('/:buildingId/addFloor')
  /** PUT /api/buildings/:buildingId/addFloor */
  .put(jwtCheck({ secret: secretPartner }), validate(addFloorValidation), addFloor)

router.route('/:buildingId/removeFloor')
  /** PUT /api/buildings/:buildingId/removeFloor */
  .put(jwtCheck({ secret: secretPartner }), validate(removeFloorValidation), removeFloor);

/** Load building when API with buildingId route parameter is hit */
router.param('buildingId', load);

export default router;
