import Joi from 'joi';

export default {
	// POST /api/auth-partner/login
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }
}