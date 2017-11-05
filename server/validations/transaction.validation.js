import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.ObjectId = JoiObjectId(Joi);

export default {

	// POST /api/transactions
	createTransaction: {
		body: {
			user: Joi.ObjectId().required(),
			building: Joi.ObjectId().required()
		}
	},

	// PUT /api/transactions/:transactionId

	updateTransaction: {
		params: {
			transactionId: Joi.ObjectId().required()
		},
		body: {
			user: Joi.ObjectId(),
			building: Joi.ObjectId(),
			floor: Joi.ObjectId(),
			parkingLot: Joi.ObjectId(),
		}
	},

	// DELETE /api/transactions/:transactionId

	deleteTransaction: {
		params: {
			transactionId: Joi.ObjectId().required(),
		}
	},

	// GET /api/transactions/:transactionId

	getTransaction: {
		params: {
			transactionId: Joi.ObjectId().required(),
		}
	},



}
