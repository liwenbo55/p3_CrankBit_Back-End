import express from 'express'
import tenantRouter from './tenant'
import authRouter from './auth'
import companyRouter from './company'
import authenticateTenant from '../middleware/auth'

const v1Router = express.Router()

v1Router.use('/auth', authRouter)
v1Router.use('/tenant', authenticateTenant, tenantRouter)
v1Router.use('/companies', authenticateTenant, companyRouter)

export default v1Router
