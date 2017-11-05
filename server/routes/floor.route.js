import express from 'express';
import validate from 'express-validation';
import jwtCheck from 'express-jwt';
import {
  createFloor,
  updateFloor,
  getFloor,
  deleteFloor,
  addParkingLot as addParkingLotValidation,
  removeParkingLot as removeParkingLotValidation,
} from '../validations/floor.validation';
import {
  create,
  list,
  update,
  remove,
  load,
  get,
  addParkingLot,
  removeParkingLot
} from '../controllers/floor.controller';
import { jwtSecret as secret, jwtAdminSecret as secretAdmin } from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/floors - Get list of floors */
  .get(jwtCheck({ secret: secret }), list)

  /** POST /api/floors - Create new floor */
  .post(validate(createFloor), create);

router.route('/:floorId')
  /** GET /api/users/:florId - Get floor single data */
  .get(jwtCheck({ secret }), validate(getFloor), get)

  /** PUT /api/users/:userId - Update user */
  .put(jwtCheck({ secret }), validate(updateFloor), update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(jwtCheck({ secret }), validate(deleteFloor), remove);

/** Load user when API with userId route parameter is hit */
router.param('floorId', load);

export default router;
