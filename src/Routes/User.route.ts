import express from 'express';
import * as userController from '../Controllers/User.controller';

export const userRoute = express.Router();

userRoute.post('/signup', userController.userSignup);
userRoute.post('/signin', userController.userSignin);
