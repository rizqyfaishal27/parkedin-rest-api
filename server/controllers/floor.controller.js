import Floor from '../models/floor.model';
import ParkingLot from '../models/parking_lot.model';


export const load = (req, res, next, id) => {
  Floor.getWithParkingLots(id)
    .then((floor) => {
      req.floor = floor; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(next);
}

/**
 * Get single floor data
 * @returns {Building}
 */
export const get = (req, res) => res.rest.success({ building: req.floor.view() })

/**
 * Create new floor
 * @property {string} req.body.floorName - The name of the floor
 * @property {number} req.body.order - The order number floor on building
 * @property {string} req.body.mapImageUrl - The imageUrl of floor map
 * @property {string} req.body.building - The ObjectId of building
 * @returns {Floor}
 */
export const create = (req, res, next) =>
  Floor.create(req.body)
    .then(floor => floor.view())
    .then(floor => res.rest.success({ floor }))
    .catch(next)

/**
 * Update Existing floor
 * @property {string} req.body.floorName - The name of the floor
 * @property {number} req.body.order - The order number floor on building
 * @property {string} req.body.mapImageUrl - The imageUrl of floor map
 * @property {string} req.body.building - The ObjectId of building
 * @returns {Floor}
 */
export const update = (req, res, next) =>
  req.floor.set(req.body).save()
    .then(savedFloor => savedFloor.view())
    .then(floor => res.rest.success({ floor }))
    .catch(next)

/**
 * Get floor list.
 * @property {number} req.query.skip - Number of floors to be skipped.
 * @property {number} req.query.limit - Limit number of floors to be returned.
 * @returns {Building[]}
 */
export const list = ({ query:{ limit = 50, skip = 0 }}, res, next) =>
  Floor.list({ limit, skip })
    .then(floors => floors.map(floor => building.view()))
    .then(floors => res.rest.success(floors))
    .catch(next);

/**
 * Delete floor.
 * @returns {Null}
 */
export const remove = (req, res, next) =>
  req.floor.remove()
    .then(removed => removed)
    .then(res.rest.noContent())
    .catch(next);

/**
 * Add Parking Lot to the floor
 * @returns {Floor include ParkingLot in populate}
 */
export const addParkingLot = (req, res, next) => {
  req.floor.parkingLots
  	.push({ parkingLots: ParkingLot.create({ ...req.body, floor: req.params.floorId }).then(parkingLot => parkingLot.id) })

  req.floor
  	.save()
    .then(savedFloor => savedFloor.view())
    .then(floor => res.rest.success({ floor }))
    .catch(next)
}


/**
 * Remove ParkingLot from the floor
 * @returns {Floor include ParkingLot in populate}
 */
export const removeParkingLot = (req, res, next) =>
  Floor.findById(req.body.floorId)
  	.then(floor => floor)
  	.then(floor => req.floor.pull({ parkingLots: req.body.parkingLotId }).save())
  	.then(savedFloor => savedFloor || res.rest.serverError())
  	.then(floor => res.rest.success({ floor }));
