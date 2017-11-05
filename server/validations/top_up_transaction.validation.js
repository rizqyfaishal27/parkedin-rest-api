import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.ObjectId = JoiObjectId(Joi);

export default {
  // POST /api/top-up-transactions
  createTopUpTransaction: {
    body: {
      user: Joi.ObjectId().required(),
      total: Joi.number().required(),
    }
  },

  // PUT /api/top-up-transactions/:topUpTransactionId
  updateTopUpTransaction: {
    body: {
      user: Joi.ObjectId().required(),
      total: Joi.number().required(),
    },
    params: {
      topUpTransactionId: Joi.ObjectId().required()
    }
  },

  // GET /api/top-up-transactions/:topUpTransactionId
  getTopUpTransaction: {
    params: {
      topUpTransactionId: Joi.ObjectId().required()
    }
  },

  // DELETE /api/top-up-transactions/:topUpTransactionId
  deleteTopUpTransaction: {
    params: {
      topUpTransactionId: Joi.ObjectId().required()
    }
  },

};
