import Building from '../models/building.model';
import Floor from '../models/floor.model';

export const load = (req, res, next, id) => {
  Building.getWithFloorData(id)
    .then((building) => {
      req.building = building; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(next);
}

/**
 * Get single building data
 * @returns {Building}
 */
export const get = (req, res) => res.rest.success({ building: req.building.view() })

/**
 * Create new building
 * @property {string} req.body.buildingName - The name of the building
 * @property {string} req.body.address - The address of the building
 * @property {number} req.body.longitude - The longitude coordinate of the building
 * @property {number} req.body.latitude - The latitude coordinate of the building
 * @property {string} req.body.imageUrl - The imageUrl photos of the building
 * @property {number} req.body.payPerHour - The amount of pay per hour of the building
 * @returns {Building}
 */
export const create = (req, res, next) =>
  Building.create(req.body)
    .then(building => building.view())
    .then(building => res.rest.success({ building }))
    .catch(next)

/**
 * Update existing admin
 * @property {string} req.body.buildingName - The name of the building
 * @property {string} req.body.address - The address of the building
 * @property {number} req.body.longitude - The longitude coordinate of the building
 * @property {number} req.body.latitude - The latitude coordinate of the building
 * @property {string} req.body.imageUrl - The imageUrl photos of the building
 * @property {number} req.body.payPerHour - The amount of pay per hour of the building
 * @returns {Building}
 */
export const update = (req, res, next) =>
  req.building.set(req.body).save()
    .then(savedBuilding => savedBuilding.view())
    .then(building => res.rest.success({ building }))
    .catch(next)

/**
 * Get building list.
 * @property {number} req.query.skip - Number of buildings to be skipped.
 * @property {number} req.query.limit - Limit number of buildings to be returned.
 * @returns {Building[]}
 */
export const list = ({ query:{ limit = 50, skip = 0 }}, res, next) =>
  Building.list({ limit, skip })
    .then(buildings => buildings.map(building => building.view()))
    .then(buildings => res.rest.success(buildings))
    .catch(next);

/**
 * Delete building.
 * @returns {Null}
 */
export const remove = (req, res, next) =>
  req.building.remove()
    .then(removed => removed)
    .then(res.rest.noContent())
    .catch(next);

/**
 * Add Floor for the building
 * @returns {Building include Floor in populate}
 */
export const addFloor = (req, res, next) => {
  req.building.floors
  	.push({ floors: Floor.create({ ...req.body, building: req.params.buildingId }).then(floor => floor.id) })
  return req.building.save()
    .then(savedBuilding => savedBuilding.view())
    .then(building => res.rest.success({ building }))
    .catch(next)
}


/**
 * Remove Floor for the building
 * @returns {Building include Floor in populate}
 */
export const removeFloor = (req, res, next) =>
  Floor.findById(req.body.floorId)
  	.then(floor => { console.log(floor); return floor || res.rest.notFound() })
  	.then(floor => { req.building.floors.pull({ floors: floor.id }); return req.building.save() })
  	.then(savedBuilding => savedBuilding.view() || res.rest.serverError())
  	.then(building => res.rest.success({ building }));
