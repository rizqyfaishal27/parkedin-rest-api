import express from 'express';
import validate from 'express-validation';
import { login as loginValidation } from '../validations/auth_admin.validation';
import { login } from '../controllers/auth_admin.controller';

const router = express.Router();

router.route('/login')
  .post(validate(loginValidation), login);


export default router;
