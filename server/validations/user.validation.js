import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.ObjectId = JoiObjectId(Joi);
export default {
  // POST /api/users
  createUser: {
    body: {
      email: Joi.string().email().required(),
      fullName: Joi.string().regex(/^[a-zA-Z\s']{3,255}$/).required(),
      password: Joi.string().min(6).max(40).required(),
      phoneNumber: Joi.string().min(9).max(13).required()
    }
  },

  // PUT /api/users/:userId
  updateUser: {
    body: {
      email: Joi.string().email(),
      fullName: Joi.string().min(3).max(255),
      password: Joi.string().min(6).max(40),
      phoneNumber: Joi.string().min(9).max(13)
    },
    params: {
      userId: Joi.ObjectId().required()
    }
  },

  // GET /api/users/:userId

  getUser: {
    params: {
      userId: Joi.ObjectId().required()
    }
  },

  // DELETE /api/users/:userId

  deleteUser: {
    params: {
      userId: Joi.ObjectId().required()
    }
  }
};
