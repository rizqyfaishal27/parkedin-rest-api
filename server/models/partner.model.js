import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

import APIError from '../helpers/APIError';
import { env } from '../../config/config.js';

require('mongoose-type-email');

/**
 * Partner Schema
 */
const PartnerSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
  },
  partnerName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  buildings: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Building' }]
  },
  isAccepted: {
    type: Boolean,
    default: false,
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

 PartnerSchema.pre('save', function(next) {
  if(!this.isModified('password')) {
    return next();
  }
  const rounds = env === 'test' ? 1 : 9;
  bcrypt.hash(this.password, rounds)
    .then((hash) => {
      this.password = hash;
      return next();
    })
    .catch(next);
 });

/**
 * Methods
 */
PartnerSchema.method({
  view() {
    return {
      id: this.id,
      partnerName: this.partnerName,
      email: this.email,
      isAccepted: this.isAccepted,
      buildings: this.buildings,
      createdAt: this.createdAt
    }
  },

  authenticate(password) {
    return bcrypt.compare(password, this.password)
      .then((valid) => valid ? this : false)
  }
});

/**
 * Statics
 */
PartnerSchema.statics = {
  /**
   * Get partner
   * @param {ObjectId} id - The objectId of admin.
   * @returns {Promise<Partner, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((partner) => {
        if (partner) {
          return partner;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List partners in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of partners to be skipped.
   * @param {number} limit - Limit number of partners to be returned.
   * @returns {Promise<Partner[]>}
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
 * @typedef Partner
 */
export default mongoose.model('Partner', PartnerSchema);
