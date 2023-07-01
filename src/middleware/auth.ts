import { Response, NextFunction } from 'express'
import HttpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'

import Payload from '../types/Payload'
import Request from '../types/Request'

const authenticateTenant = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('Authentication Invalid')
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    res.status(HttpStatusCodes.UNAUTHORIZED).json({ msg: 'Authorization denied' })
    return
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

    const payload: Payload = typeof verifiedToken === 'string' ? { tenantId: verifiedToken } : verifiedToken

    req.tenantId = payload.tenantId

    next()
  } catch (err) {
    res.status(HttpStatusCodes.FORBIDDEN).json({ msg: 'Authorization invalid' })
  }
}

export default authenticateTenant
