import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Tenant } from '../models/Tenant'
import TenantSchema from '../schemas/Tenant'

export const register = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = TenantSchema.validate(req.body)

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    return
  }

  const { name, email, password } = value

  const tenantExists = await Tenant.findOne({ email })
  if (tenantExists) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide another valid email address' })
  }

  const tenant = await Tenant.create({ name, email, password })
  const token = tenant.createJwt()
  res.status(StatusCodes.CREATED).json({
    tenant: {
      tenantId: tenant._id,
      name: tenant.name,
      email: tenant.email,
    },
    token,
  })
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = TenantSchema.validate(req.body)

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    return
  }

  const { email, password } = value

  const tenant = await Tenant.findOne({ email }).select('+password')
  if (!tenant) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid credentials' })
  }

  const isPasswordCorrect = await tenant.comparePassword(password)
  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid credentials' })
  }

  const token = tenant.createJwt()
  tenant.password = undefined
  res.status(StatusCodes.OK).json({
    tenant: {
      userId: tenant._id,
      name: tenant.name,
      email: tenant.email,
    },
    token,
  })
}
