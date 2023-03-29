import express from 'express';

import { httpAddNewUser, httpAuthenticateUser } from './users.controller.js';

const usersRouter = express.Router();

usersRouter.post('/addNewUser', httpAddNewUser)
usersRouter.post('/authenticateUser', httpAuthenticateUser)

export {
    usersRouter
}