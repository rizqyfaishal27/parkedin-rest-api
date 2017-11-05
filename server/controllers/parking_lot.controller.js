import ParkingLot from '../models/parking_lot.model';

export const load = (req, res, next, id) => {
  ParkingLot.get(id)
    .then((parkingLot) => {
      req.parkingLot = parkingLot; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(next);
}

/**
 * Get single parkingLot data
 * @returns {ParkingLot}
 */
export const get = (req, res) => res.rest.success({ parkingLot: req.parkingLot.view() })

/**
 * Create new parkingLot
 * @property {string} req.body.parkingLotName - The name of the parkingLot
 * @property {number} req.body.order - The order number of the parkingLot
 * @property {string} req.body.building - The objectId of the building
 * @property {string} req.body.floor - The ObjectId of the floor
 * @returns {ParkingLot}
 */
export const create = (req, res, next) =>
  ParkingLot.create(req.body)
    .then(parkingLot => parkingLot.view())
    .then(parkingLot => res.rest.success({ parkingLot }))
    .catch(next)

/**
 * Update existing parkingLot
 * @property {string} req.body.parkingLotName - The name of the parkingLot
 * @property {number} req.body.order - The order number of the parkingLot
 * @property {string} req.body.building - The objectId of the building
 * @property {string} req.body.floor - The ObjectId of the floor
 * @returns {ParkingLot}
 */
export const update = (req, res, next) =>
  req.parkingLot.set(req.body).save()
    .then(savedParkingLot => savedParkingLot.view())
    .then(parkingLot => res.rest.success({ parkingLot }))
    .catch(next)

/**
 * Get parkingLot list.
 * @property {number} req.query.skip - Number of buildings to be skipped.
 * @property {number} req.query.limit - Limit number of buildings to be returned.
 * @returns {ParkingLot[]}
 */
export const list = ({ query:{ limit = 50, skip = 0 }}, res, next) =>
  ParkingLot.list({ limit, skip })
    .then(parkingLots => buildings.map(parkingLot => parkingLot.view()))
    .then(parkingLots => res.rest.success(parkingLots))
    .catch(next);

/**
 * Delete ParkingLot.
 * @returns {Null}
 */
export const remove = (req, res, next) =>
  req.parkingLot.remove()
    .then(removed => removed)
    .then(res.rest.noContent())
    .catch(next);
