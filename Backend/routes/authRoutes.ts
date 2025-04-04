import { Router } from 'express';   // Import Router from express
import { loginHandler, registration, home } from '../controller/authController';  // Correctly import the handlers
import authorizationCheck from '../middleware/authorization_middleware';

const routes = Router();  // Create a new instance of Router
// console.log(loginHandler)
// POST route for user login
routes.post('/login', loginHandler);

// POST route for user registration
routes.post('/register', registration);
routes.get('/home',authorizationCheck, home);

export default routes;  // Export the routes
