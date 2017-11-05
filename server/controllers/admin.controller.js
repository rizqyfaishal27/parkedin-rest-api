import Admin from '../models/admin.model';


export const load = (req, res, next, id) => {
  Admin.get(id)
    .then((admin) => {
      req.admin = admin; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(next);
}

/**
 * Get single admin data
 * @returns {Admin}
 */
export const get = (req, res) => res.rest.success({ admin: req.admin.view() })

/**
 * Create new admin
 * @property {string} req.body.fullName - The full name of admin.
 * @property {string} req.body.email - The email of admin.
 * @property {string} req.body.password - The pasword of admin.
 * @returns {Admin}
 */
export const create = (req, res, next) =>
  Admin.create(req.body)
    .then(admin => admin.view())
    .then(admin => res.rest.success({ admin }))
    .catch(next)

/**
 * Update existing admin
 * @property {string} req.body.email - The username of admin.
 * @returns {Admin}
 */
export const update = (req, res, next) =>
  req.admin.set(req.body).save()
    .then(savedAdmin => savedAdmin.view())
    .then(admin => res.rest.success({ admin }))
    .catch(next)

/**
 * Get admin list.
 * @property {number} req.query.skip - Number of admins to be skipped.
 * @property {number} req.query.limit - Limit number of admins to be returned.
 * @returns {Admin[]}
 */
export const list = ({ query:{ limit = 50, skip = 0 }}, res, next) =>
  Admin.list({ limit, skip })
    .then(admins => admins.map(admin => admin.view()))
    .then(admins => res.rest.success(admins))
    .catch(next);

/**
 * Delete admin.
 * @returns {Null}
 */
export const remove = (req, res, next) =>
  req.admin.remove()
    .then(removed => removed)
    .then(res.rest.noContent())
    .catch(next);

/**
 * Accept existing partner
 * @returns {Partner}
 */
export const acceptPartner = (req, res, next) =>
  req.partner.set({ isAccepted: true }).save()
    .then(savedPartner => savedPartner.view())
    .then(partner => res.rest.success({ partner }))
    .catch(next)