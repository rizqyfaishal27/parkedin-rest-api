import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

import APIError from '../helpers/APIError';
import { env } from '../../config/config.js';

require('mongoose-type-email');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
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
  totalCurrentPoints: {
    type: Number,
    default: 0
  },
  totalCurrentBalance: {
    type: Number,
    default: 0,
  },
  phoneNumber: {
    type: String,
    required: true,
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



 UserSchema.pre('save', function(next) {
  console.log(this);
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
UserSchema.method({
  view() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      totalCurrentBalance: this.totalCurrentBalance,
      totalCurrentPoints: this.totalCurrentPoints,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt
    }
  },
  authenticate(password) {
    console.log(password);
    console.log(this.password);
    return bcrypt.compare(password, this.password)
      .then((valid) => valid ? this : false)
  }
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
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
export default mongoose.model('User', UserSchema);
