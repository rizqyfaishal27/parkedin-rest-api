import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.ObjectId = JoiObjectId(Joi);

export default {

	// POST /api/floors
	createFloor: {
		body: {
			floorName: Joi.string().min(3).max(90).required(),
			mapImageUrl:  Joi.string().regex(/^https?:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\/[a-zA-Z0-9]+\.(png|jpg|jpeg)/).required(),
			building: Joi.ObjectId().required(),
			order: Joi.number().required(),
		}
	},

	// PUT /api/floors/:floorId

	updateFloor: {
		params: {
			floorId: Joi.ObjectId().required()
		},
		body: {
			floorName: Joi.string().min(3).max(90).required(),
			mapImageUrl:  Joi.string().regex(/^https?:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\/[a-zA-Z0-9]+\.(png|jpg|jpeg)/).required(),
			building: Joi.ObjectId().required(),
			order: Joi.number().required(),
		}
	},

	// PUT /api/floors/:floorId/addParkingLot

	addParkingLot: {
		params: {
			floorId: Joi.ObjectId().required()
		},
		body: {
			parkingLotName: Joi.string().min(3).max(90).required(),
			order: Joi.number().required(),
			building: Joi.ObjectId().required(),
			floor: Joi.ObjectId().required()
		}
	},

	// PUT /api/floors/:floorId/removeParkingLot

	removeParkingLot: {
		params: {
			floorId: Joi.ObjectId().required()
		},
		body: {
			parkingLotId: Joi.ObjectId().required()
		}
	},

	// DELETE /api/floors/:floorId

	deleteFloor: {
		params: {
			floorId: Joi.ObjectId().required(),
		}
	},

	// GET /api/buildings/:buildingId

	getFloor: {
		params: {
			floorId: Joi.ObjectId().required(),
		}
	},



}
