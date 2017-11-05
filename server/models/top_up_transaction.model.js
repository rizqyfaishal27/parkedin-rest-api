import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

import APIError from '../helpers/APIError';
import { env } from '../../config/config.js';

require('mongoose-type-email');

/**
 * TopUpTransaction Schema
 */
const TopUpTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  finishedAt: {
    type: Date,
  },
  total: {
    type: Number,
    default: 0
  }
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
TopUpTransactionSchema.method({
  view() {
    return {
      id: this.id,
      user: this.user,
      total: this.total,
      createdAt: this.createdAt
    }
  },
});

/**
 * Statics
 */
TopUpTransactionSchema.statics = {
  /**
   * Get topUpTransactionSchema
   * @param {ObjectId} id - The objectId of parkingLot.
   * @returns {Promise<ParkingLot, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((topUpTransaction) => {
        if (topUpTransaction) {
          return topUpTransaction;
        }
        const err = new APIError('No such parkingLot exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List topUpTransactions in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of topUpTrasactions to be skipped.
   * @param {number} limit - Limit number of topUpTrasactions to be returned.
   * @returns {Promise<ParkingLot[]>}
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
 * @typedef ParkingLot
 */
export default mongoose.model('TopUpTransactionSchema', TopUpTransactionSchema);
