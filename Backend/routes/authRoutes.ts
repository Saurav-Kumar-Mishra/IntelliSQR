import { Router } from 'express'
import { loginHandler, registration, home } from '../controller/authController' 
import authorizationCheck from '../middleware/authorization_middleware'

const routes = Router() 

routes.post('/login', loginHandler)


routes.post('/register', registration)
routes.get('/home', authorizationCheck, home)

export default routes 


// password has been encrypted by using bcrypt library
// this cookie is valid for 1hr