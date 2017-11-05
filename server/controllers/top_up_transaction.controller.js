import Transaction from '../models/transaction.model';

export const load = (req, res, next, id) => {
  Building.get(id)
    .then((transaction) => {
      req.transaction = transaction; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(next);
}

/**
 * Get single transaction data
 * @returns {Transaction}
 */
export const get = (req, res) => res.rest.success({ transaction: req.transaction.view() })

/**
 * Create new transaction
 * @property {string} req.body.user - The ObjectId of user
 * @returns {Transaction}
 */
export const create = (req, res, next) =>
  Transaction.create(req.body)
    .then(transaction => transaction.view())
    .then(transaction => res.rest.success({ transaction }))
    .catch(next)

/**
 * Update existing transaction
 * @property {string} req.body.user - The ObjectId of the user
 * @property {string} req.body.building - The ObjectId of the building
 * @property {string} req.body.floor - The ObjectId of the floor
 * @property {string} req.body.parkingLot - The ObjectId of the floor
 * @returns {Transaction}
 */
export const update = (req, res, next) =>
  req.transaction.set(req.body).save()
    .then(savedTransaction => savedTransaction.view())
    .then(transaction => res.rest.success({ transaction }))
    .catch(next)

/**
 * Get transaction list.
 * @property {number} req.query.skip - Number of buildings to be skipped.
 * @property {number} req.query.limit - Limit number of buildings to be returned.
 * @returns {Transaction[]}
 */
export const list = ({ query:{ limit = 50, skip = 0 }}, res, next) =>
  Building.list({ limit, skip })
    .then(transactions => buildings.map(transaction => transaction.view()))
    .then(transactions => res.rest.success(transactions))
    .catch(next);

/**
 * Delete Transaction.
 * @returns {Null}
 */
export const remove = (req, res, next) =>
  req.transaction.remove()
    .then(removed => removed)
    .then(res.rest.noContent())
    .catch(next);
