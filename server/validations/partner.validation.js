import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.ObjectId = JoiObjectId(Joi);

export default {
  // POST /api/partners
  createPartner: {
    body: {
      email: Joi.string().email().required(),
      partnerName: Joi.string().regex(/^[a-zA-Z\s']{3,255}$/).required(),
      password: Joi.string().min(6).max(40).required(),
    }
  },

  // PUT /api/partners/:partnerId
  updatePartner: {
    body: {
      email: Joi.string().email(),
      partnerName: Joi.string().min(3).max(255),
      password: Joi.string().min(6).max(40),
    },
    params: {
      partnerId: Joi.ObjectId().required()
    }
  },

  // GET /api/partners/:partnerId
  getPartner: {
    params: {
      partnerId: Joi.ObjectId().required()
    }
  },

  // DELETE /api/partners/:partnerId
  deletePartner: {
    params: {
      partnerId: Joi.ObjectId().required()
    }
  },

  // PUT /api/admins/partners/:partnerId/accept

  acceptPartner: {
    params: {
      partnerId: Joi.ObjectId().required(),
    }
  }
};
