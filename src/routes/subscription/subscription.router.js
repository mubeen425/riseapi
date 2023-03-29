import express from 'express';

import { httpSubscriptionHandler } from './subscription.controller.js';

const subscriptionRouter = express.Router();

subscriptionRouter.post('/create-checkout-session', httpSubscriptionHandler);

export {
    subscriptionRouter
}