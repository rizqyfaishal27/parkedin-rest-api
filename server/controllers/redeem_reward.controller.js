import RedeemReward from '../models/redeem_reward.model';


export const load = (req, res, next, id) => {
  RedeemReward.get(id)
    .then((redeemReward) => {
      req.redeemReward = redeemReward; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(next);
}

/**
 * Get single redeemReward data
 * @returns {Partner}
 */
export const get = (req, res) => res.rest.success({ redeemReward: req.redeemReward.view() })

/**
 * Create new redeemReward
 * @property {string} req.body.partnerName - The  name of partner.
 * @property {string} req.body.email - The email of partner.
 * @property {string} req.body.password - The pasword of partner.
 * @returns {Partner}
 */
export const create = (req, res, next) =>
  Partner.create(req.body)
    .then(partner => partner.view())
    .then(partner => res.rest.success({ partner }))
    .catch(next)

/**
 * Update existing partner
 * @property {string} req.body.partnerName - The username of partner.
 * @property {string} req.body.email - The email of partner
 * @returns {Partner}
 */
export const update = (req, res, next) =>
  req.partner.set(req.body).save()
    .then(savedPartner => savedPartner.view())
    .then(partner => res.rest.success({ partner }))
    .catch(next)

/**
 * Get partner list.
 * @property {number} req.query.skip - Number of partners to be skipped.
 * @property {number} req.query.limit - Limit number of partners to be returned.
 * @returns {Partner[]}
 */
export const list = ({ query:{ limit = 50, skip = 0 }}, res, next) =>
  Partner.list({ limit, skip })
    .then(partners => partners.map(partner => partner.view()))
    .then(partners => res.rest.success(partners))
    .catch(next);

/**
 * Delete partner.
 * @returns {Partner}
 */
export const remove = (req, res, next) =>
  req.partner.remove()
    .then(removed => removed || res.rest.serverError())
    .then(res.rest.noContent())
    .catch(next);
