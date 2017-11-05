import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { isUndefined, isNull } from 'lodash'; 

import APIError from '../helpers/APIError';
import { env } from '../../config/config.js';

require('mongoose-type-email');

/**
 * Building Schema
 */
const BuildingSchema = new mongoose.Schema({
  buildingName: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
  },
  addressByGeocode: {
    type: String,
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  floors: {
    type: [{
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
        type: [
          {
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
          }
        ]
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
    }]
  },
  payPerHour: {
    type: Number,
    default: 0,
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
BuildingSchema.method({
  view() {
    return {
      id: this.id,
      buildingName: this.buildingName,
      address: this.address,
      addressByGeocode: this.addressByGeocode,
      longitude: this.longitude,
      latitude: this.latitude,
      imageUrl: this.imageUrl,
      floors: this.floors,
      payPerHour: this.payPerHour,
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
BuildingSchema.statics = {
  /**
   * Get Building
   * @param {ObjectId} id - The objectId of building.
   * @returns {Promise<Building, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((building) => {
        if (building) {
          return building;
        }
        const err = new APIError('No such building exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get Building populated with floors data
   * @param {ObjectId} id - The objectId of building.
   * @returns {Promise<Building, APIError>}
   */
  getWithFloorData(id) {
    return this.findById(id)
      .populate('floors')
      .exec()
      .then(building => isUndefined(building) || isNull(building) ? 
        Promise.reject(new APIError('No such building exists!', httpStatus.NOT_FOUND)) : building)
  },

  /**
   * List buildings in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of buildings to be skipped.
   * @param {number} limit - Limit number of buildings to be returned.
   * @returns {Promise<Building[]>}
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
 * @typedef Building
 */
export default mongoose.model('Building', BuildingSchema);
