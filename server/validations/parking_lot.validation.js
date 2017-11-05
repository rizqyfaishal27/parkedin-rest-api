import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.ObjectId = JoiObjectId(Joi);

export default {

	// POST /api/parking-lots

	createParkingLot: {
		body: {
			parkingLotName: Joi.string().min(3).max(90).required(),
			order: Joi.number().required(),
			building: Joi.ObjectId().required(),
			floor: Joi.ObjectId().required(),
		}
	},

	// PUT /api/parking-lots/:parkingLotId
	updateParkingLot: {
		params: {
			parkingLotId: Joi.ObjectId().required()
		},
		body: {
			parkingLotName: Joi.string().min(3).max(90),
			order: Joi.number(),
			building: Joi.ObjectId(),
			floor: Joi.ObjectId(),
		}
	},

	// DELETE /api/parking-lots/:parkingLotId

	deleteParkingLot: {
		params: {
			parkingLotId: Joi.ObjectId().required(),
		}
	},

	// GET /api/parking-lots/:parkingLotId

	getParkingLot: {
		params: {
			parkingLotId: Joi.ObjectId().required(),
		}
	},



}
