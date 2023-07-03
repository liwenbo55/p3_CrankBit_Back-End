import Joi from 'joi'

const VehicleSchema = Joi.object({
  owner: Joi.string().min(3).max(50),
  rego: Joi.string().required(),
  vin: Joi.string().required(),
  odometer: Joi.string().required().max(8),
})

export default VehicleSchema
