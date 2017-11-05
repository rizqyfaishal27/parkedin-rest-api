import express from 'express';
import validate from 'express-validation';
import jwtCheck from 'express-jwt';
import { 
  createRedeemReward, 
  updateRedeemReward, 
  getRedeemReward, 
  deleteRedeemReward, 
} from '../validations/redeem_reward.validation';

import { 
  create, 
  list, 
  update, 
  remove, 
  load, 
  get 
} from '../controllers/redeem_reward.controller';
import { 
  jwtPartnerSecret as secret, 
  jwtAdminSecret as secretAdmin 
} from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/redeem-rewards - Get list of redeem-rewards */
  .get(jwtCheck({ secret: secret }), list)

  /** POST /api/redeem-rewards - Create new redeem-reward */
  .post(validate(createRedeemReward), create);

router.route('/:redeemRewardId')
  /** GET /api/redeem-rewards/:redeemRewardId - Get redeem-reward */
  .get(jwtCheck({ secret }), validate(getRedeemReward), get)

  /** PUT /api/redeem-rewards/:redeemRewardId - Update redeem-reward */
  .put(jwtCheck({ secret }), validate(updateRedeemReward), update)

  /** DELETE /api/redeem-rewards/:redeemRewardId - Delete redeem-reward */
  .delete(jwtCheck({ secret: secretAdmin }), validate(deleteRedeemReward), remove);

/** Load redeem-reward data when API with redeemRewardId route parameter is hit */
router.param('redeemRewardId', load);

export default router;
