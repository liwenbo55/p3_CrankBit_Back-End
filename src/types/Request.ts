import { Request } from 'express'
import Payload from './Payload'

type CustomRequest = Request & Payload

export default CustomRequest
