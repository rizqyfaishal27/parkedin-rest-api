import User from '../models/user.model';


export const load = (req, res, next, id) => {
  User.get(id)
    .then((user) => {
      req.loadedUser = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(next);
}

/**
 * Get singl user data
 * @returns {User}
 */
export const get = (req, res) => res.rest.success({ user: req.loadedUser.view() })

/**
 * Create new user
 * @property {string} req.body.fullName - The full name of user.
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The pasword of user.
 * @returns {User}
 */
export const create = (req, res, next) =>
  User.create(req.body)
    .then(user => user.view())
    .then(user => res.rest.success({ user }))
    .catch(next)

/**
 * Update existing user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.fullName - The full name of user.
 * @property {string} req.body.phoneNumber - The phone number of user.
 * @returns {User}
 */
export const update = (req, res, next) =>
  req.loadedUser.set(req.body).save()
    .then(savedUser => savedUser.view())
    .then(user => res.rest.success({ user }))
    .catch(next)

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
export const list = ({ query:{ limit = 50, skip = 0 }}, res, next) =>
  User.list({ limit, skip })
    .then(users => users.map(user => user.view()))
    .then(users => res.rest.success(users))
    .catch(next);

/**
 * Delete user.
 * @returns {User}
 */
export const remove = (req, res, next) =>
  req.loadedUser.remove()
    .then(removed => removed)
    .then(res.rest.noContent())
    .catch(next);

