import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import adminRoutes from './admin.route';
import partnerRoutes from './partner.route';
import authAdminRoutes from './auth_admin.route';
import authPartnerRoutes from './auth_partner.route';
import buildingRoutes from './building.route';
import floorRoutes from './floor.route';
import transactionRoutes from './transaction.route';
import parkingLotRoutes from './parking_lot.route';
import redeemRewardRoutes from './redeem_reward.route.js';


const router = express.Router(); // eslint-disable-line new-cap

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/auth-admin', authAdminRoutes);
router.use('/auth-partner', authPartnerRoutes);
router.use('/partners', partnerRoutes);
router.use('/admins', adminRoutes);
router.use('/buildings', buildingRoutes);
router.use('/floors', floorRoutes);
router.use('/transactions', transactionRoutes);
router.use('/parking-lots', parkingLotRoutes);
router.use('/redeem-rewards', redeemRewardRoutes);

export default router;
