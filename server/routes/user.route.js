import express from 'express';
import validate from 'express-validation';
import jwtCheck from 'express-jwt';
import { createUser, updateUser, getUser, deleteUser } from '../validations/user.validation';
import { create, list, update, remove, load, get } from '../controllers/user.controller';
import { jwtSecret as secret, jwtAdminSecret as secretAdmin } from '../../config/config';

const matchIdWithJWTID = (req, res, next) =>
  (req.params.userId == req.loadedUser._id) ? next() : res.rest.badRequest()

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(jwtCheck({ secret: secretAdmin }), list)

  /** POST /api/users - Create new user */
  .post(validate(createUser), create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(jwtCheck({ secret }), validate(getUser), matchIdWithJWTID, get)

  /** PUT /api/users/:userId - Update user */
  .put(jwtCheck({ secret }), validate(updateUser), matchIdWithJWTID, update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(jwtCheck({ secret }), validate(deleteUser), matchIdWithJWTID, remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', load);

export default router;
