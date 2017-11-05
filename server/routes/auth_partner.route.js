import express from 'express';
import validate from 'express-validation';
import { login as loginValidation } from '../validations/auth_partner.validation';
import { login } from '../controllers/auth_partner.controller';

const router = express.Router();

router.route('/login')
  .post(validate(loginValidation), login);


export default router;
