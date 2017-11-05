import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { isUndefined, isNull } from 'lodash';
import APIError from '../helpers/APIError';
import { env } from '../../config/config.js';

require('mongoose-type-email');

/**
 * Floor Schema
 */
const FloorSchema = new mongoose.Schema({
  floorName: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true,
  },
  building: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  parkingLots: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'ParkingLot'}]
  },
  mapImageUrl: {
    type: String,
    required: true,
  },
  totalReservedParkingLot: {
    type: Number,
    default: 0
  },
  totalParkingLot: {
    type: Number,
    default: 0
  },
  totalRemainingParkingLot: {
    type: Number,
    default: 0
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
FloorSchema.method({
  view() {
    return {
      id: this.id,
      floorName: this.floorName,
      order: this.order,
      building: this.building,
      parkingLots: this.parkingLots,
      mapImageUrl: this.mapImageUrl,
      totalReservedParkingLot: this.totalReservedParkingLot,
      totalParkingLot: this.totalParkingLot,
      totalRemainingParkingLot: this.totalRemainingParkingLot,
      createdAt: this.createdAt
    }
  },
});

/**
 * Statics
 */
FloorSchema.statics = {
  /**
   * Get floor
   * @param {ObjectId} id - The objectId of floor.
   * @returns {Promise<Floor, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((floor) => {
        if (floor) {
          return floor;
        }
        const err = new APIError('No such floor exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get floor with parking lots data
   * @param {ObjectId} id - The objectId of floor.
   * @returns {Promise<Floor, APIError>}
   */
  getWithParkingLotsData(id) {
    return this.findById(id)
      .populate('parkingLots')
      .exec()
      .then(floor => isNull(floor) || isUndefined(floor) ? 
        new Promise(new APIError('No such floor exists!', httpStatus.NOT_FOUND)) : floor)
  },

  /**
   * List floors in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of floors to be skipped.
   * @param {number} limit - Limit number of floors to be returned.
   * @returns {Promise<Floor[]>}
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
 * @typedef Floor
 */
export default mongoose.model('Floor', FloorSchema);
