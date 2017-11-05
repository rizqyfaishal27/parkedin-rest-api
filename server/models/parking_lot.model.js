import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';
import { env } from '../../config/config.js';

require('mongoose-type-email');

/**
 * ParkingLot Schema
 */
const ParkingLotSchema = new mongoose.Schema({
  parkingLotName: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true,
  },
  floor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Floor'
  },
  building: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Building'
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
  isOnRecommendedForUser: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
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
ParkingLotSchema.method({
  view() {
    return {
      id: this.id,
      parkingLotName: this.parkingLotName,
      floor: this.floor,
      building: this.building,
      order: this.order,
      isReserved: this.isReserved,
      isOnRecommendedForUser: this.isOnRecommendedForUser,
      createdAt: this.createdAt
    }
  },
});

/**
 * Statics
 */
ParkingLotSchema.statics = {
  /**
   * Get parkingLot
   * @param {ObjectId} id - The objectId of parkingLot.
   * @returns {Promise<ParkingLot, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((parkingLot) => {
        if (parkingLot) {
          return parkingLot;
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
export default mongoose.model('ParkingLot', ParkingLotSchema);
