import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.ObjectId = JoiObjectId(Joi);

export default {
  // POST /api/admins
  createAdmin: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(40).required(),
      fullName: Joi.string().regex(/^[a-zA-Z\s']{3,255}$/).required(),
      masterKey: Joi.string().required(),
    }
  },

  // UPDATE /api/admins/:adminId
  updateAdmin: {
    body: {
      email: Joi.string().email(),
      fullName: Joi.string().min(3).max(255),
      password: Joi.string().min(6).max(40),
    },
    params: {
      adminId: Joi.ObjectId().required()
    }
  },

};
