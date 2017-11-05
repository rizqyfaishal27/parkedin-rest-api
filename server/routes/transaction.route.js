import express from 'express';
import validate from 'express-validation';
import jwtCheck from 'express-jwt';
import {
  createTransaction,
  updateTransaction,
  getTransaction,
  deleteTransaction
} from '../validations/transaction.validation';
import {
  create,
  list,
  update,
  remove,
  load,
  get
} from '../controllers/transaction.controller';
import { jwtSecret as secret, jwtAdminSecret as secretAdmin } from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/transactions - Get list of transactions */
  .get(jwtCheck({ secret: secret }), list)

  /** POST /api/transactions - Create new transaction */
  .post(validate(createTransaction), create);

router.route('/:transactionId')
  /** GET /api/transactions/:transactionId - Get transaction */
  .get(jwtCheck({ secret }), validate(getTransaction), get)

  /** PUT /api/transactions/:transactionId - Update transaction */
  .put(jwtCheck({ secret }), validate(updateTransaction), update)

  /** DELETE /api/transactions/:transactionId - Delete transaction */
  .delete(jwtCheck({ secret }), validate(deleteTransaction), remove);

/** Load user when API with transactionId route parameter is hit */
router.param('transactionId', load);

export default router;
