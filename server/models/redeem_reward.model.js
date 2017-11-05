import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

import APIError from '../helpers/APIError';
import { env } from '../../config/config.js';

require('mongoose-type-email');

/**
 * RedeemReward Schema
 */
const RedeemRewardSchema = new mongoose.Schema({
  categoryName: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  amountPointsNeeded: {
    type: Number,
    default: 0
  },
  stockRemaining: {
    type: Number,
    default: 0,
  },
  totalStock: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
RedeemRewardSchema.method({
  view() {
    return {
      id: this.id,
      categoryName: this.categoryName,
      name: this.name,
      description: this.description,
      amountPointsNeeded: this.amountPointsNeeded,
      stockRemaining: this.stockRemaining,
      totalStock: this.totalStock,
      createdAt: this.createdAt
    }
  },
});

/**
 * Statics
 */
RedeemRewardSchema.statics = {
  /**
   * Get redeemReward
   * @param {ObjectId} id - The objectId of redeemReward.
   * @returns {Promise<RedeemReward, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((redeemReward) => {
        if (redeemReward) {
          return redeemReward;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List redeemRewards in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of redeenRewards to be skipped.
   * @param {number} limit - Limit number of redeenRewards to be returned.
   * @returns {Promise<Admin[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};


/**
 * @typedef RedeemReward
 */
export default mongoose.model('RedeemReward', RedeemRewardSchema);
