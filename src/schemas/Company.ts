import Joi from 'joi'

const domainErrorMessage = 'Please provide a valid domain name ending with ".crankbit.net".'

const CompanySchema = Joi.object({
  domain: Joi.string()
    .required()
    .min(3)
    .max(30)
    .regex(/^[A-Za-z0-9_-]+\.crankbit\.net$/)
    .error(() => domainErrorMessage),
})

export default CompanySchema
