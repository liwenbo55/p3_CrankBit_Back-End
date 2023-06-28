import express from 'express'
import userRouter from './user'
import authRouter from './auth'
import companyRouter from './company'
import authenticateUser from '../middleware/auth'

const v1Router = express.Router()

v1Router.use('/auth', authRouter)
v1Router.use('/users', authenticateUser, userRouter)
v1Router.use('/companies', authenticateUser, companyRouter)

export default v1Router
