import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import moment from 'moment';
import APIError from '../helpers/APIError';
import { env } from '../../config/config.js';

require('mongoose-type-email');

/**
 * Transaction Schema
 */
const TransactionSchema = new mongoose.Schema({
  generatedPin: {
    type: Number,
    default: 1000 + Math.floor(Math.random() * 8999)
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  parkingLot: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'ParkingLot'
  },
  floor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Floor'
  },
  building: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'building'
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  finishedAt: {
    type: Date,
  },
  total: {
    type: Number
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
TransactionSchema.method({
  view() {
    return {
      id: this.id,
      generatedPin: this.generatedPin,
      user: this.user,
      parkingLot: this.parkingLot,
      isFinished: this.isFinished,
      finishedAt: this.finishedAt,
      total: moment(this.createdAt).diff(moment(this.finishedAt), 'hour'),
      createdAt: this.createdAt
    }
  },
});

/**
 * Statics
 */
TransactionSchema.statics = {
  /**
   * Get transaction
   * @param {ObjectId} id - The objectId of transaction.
   * @returns {Promise<Transaction, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((transaction) => {
        if (transaction) {
          return transaction;
        }
        const err = new APIError('No such parkingLot exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List parkingLots in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of parkingLots to be skipped.
   * @param {number} limit - Limit number of parkingLots to be returned.
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
export default mongoose.model('Transaction', TransactionSchema);
