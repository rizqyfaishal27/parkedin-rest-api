import express from 'express';
import validate from 'express-validation';
import { login as loginValidation } from '../validations/auth_user.validation';
import { login } from '../controllers/auth.controller';

const router = express.Router();

router.route('/login')
  .post(validate(loginValidation), login);


export default router;
