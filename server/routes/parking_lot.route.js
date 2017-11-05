import express from 'express';
import validate from 'express-validation';
import jwtCheck from 'express-jwt';
import {
  createParkingLot,
  updateParkingLot,
  getParkingLot,
  deleteParkingLot
} from '../validations/parking_lot.validation';
import {
  create,
  list,
  update,
  remove,
  load,
  get
} from '../controllers/parking_lot.controller';
import { jwtSecret as secret, jwtAdminSecret as secretAdmin } from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/parking-lots - Get list of parking-lots */
  .get(jwtCheck({ secret: secretAdmin }), list)

  /** POST /api/parking-lots - Create new parking lot */
  .post(validate(createParkingLot), create);

router.route('/:parkingLotId')
  /** GET /api/parking-lots/:parkingLotId - Get parking lot */
  .get(jwtCheck({ secret }), validate(getParkingLot), get)

  /** PUT /api/parking-lots/:userId - Update user */
  .put(jwtCheck({ secret }), validate(updateParkingLot), update)

  /** DELETE /api/parking-lots/:userId - Delete user */
  .delete(jwtCheck({ secret }), validate(deleteParkingLot), remove);

/** Load user when API with parkingLotId route parameter is hit */
router.param('parkingLotId', load);

export default router;
