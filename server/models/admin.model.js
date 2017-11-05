import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

import APIError from '../helpers/APIError';
import { env } from '../../config/config.js';

require('mongoose-type-email');

/**
 * Admin Schema
 */
const AdminSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
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

 AdminSchema.pre('save', function(next) {
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
AdminSchema.method({
  view() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
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
AdminSchema.statics = {
  /**
   * Get admin
   * @param {ObjectId} id - The objectId of admin.
   * @returns {Promise<Admin, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((admin) => {
        if (admin) {
          return admin;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List admins in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of admins to be skipped.
   * @param {number} limit - Limit number of admins to be returned.
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
 * @typedef User
 */
export default mongoose.model('Admin', AdminSchema);
