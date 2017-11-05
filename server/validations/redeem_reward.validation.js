import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.ObjectId = JoiObjectId(Joi);

export default {
  // POST /api/reedem-rewards
  createRedeemReward: {
    body: {
      description: Joi.string().min(6).max(400).required(),
      categoryName: Joi.string().min(6).max(40).required(),
      name: Joi.string().min(6).max(40).required(),
      amountPointsNeeded: Joi.number().required()
    }
  },

  // PUT /api/reedem-rewards/:redeemRewardId
  updateRedeemReward: {
    body: {
      description: Joi.string().min(6).max(400),
      categoryName: Joi.string().min(6).max(40),
      name: Joi.string().min(6).max(40),
      amountPointsNeeded: Joi.number(),
    },
    params: {
      reedemRewardId: Joi.ObjectId().required()
    }
  },

  // GET /api/reedem-rewards/:redeemRewardId
  getRedeemReward: {
    params: {
      reedemRewardId: Joi.ObjectId().required()
    }
  },

  // DELETE /api/reedem-rewards/:redeemRewardId
  deleteRedeemReward: {
    params: {
      reedemRewardId: Joi.ObjectId().required()
    }
  },
};
