	import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.ObjectId = JoiObjectId(Joi);

export default {

	// POST /api/buildings
	createBuilding: {
		body: {
			buildingName: Joi.string().min(3).max(90).required(),
			address: Joi.string().min(3).max(400).required(),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
			imageUrl:  Joi.string().regex(/^https?:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\/[a-zA-Z0-9]+\.(png|jpg|jpeg)/).required(),
			payPerHour: Joi.number().required(),
		}
	},	

	// PUT /api/buildings/:buildingId

	updateBuilding: {
		params: {
			buildingId: Joi.ObjectId().required()
		},
		body: {
			buildingName: Joi.string(),
			address: Joi.string(),
			latitude: Joi.number(),
			longitude: Joi.number(),
			imageUrl: Joi.string().regex((/^https?:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\/[a-zA-Z0-9]+\.(png|jpg|jpeg)/)),
			payPerHour: Joi.number()
		}
	},

	// PUT /api/buildings/:buildingId/addFloor

	addFloor: {
		params: {
			buildingId: Joi.ObjectId().required()
		},
		body: {
			floorName: Joi.string().min(3).max(90).required(),
			order: Joi.number().required(),
			mapImageUrl: Joi.string().regex(/^https?:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\/[a-zA-Z0-9]+\.(png|jpg|jpeg)/).required()
		}
	},

	// PUT /api/buildings/:buildingId/removeFloor

	removeFloor: {
		params: {
			buildingId: Joi.ObjectId().required()
		},
		body: {
			floorId: Joi.ObjectId().required()
		}
	},

	// DELETE /api/buildings/:buildingId

	deleteBuilding: {
		params: {
			buildingId: Joi.ObjectId().required(),
		}
	},

	// GET /api/buildings/:buildingId

	getBuilding: {
		params: {
			buildingId: Joi.ObjectId().required(),
		}
	},



}