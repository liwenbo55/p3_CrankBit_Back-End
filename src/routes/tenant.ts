import { Router } from 'express'
import { getTenantById, updateTenant } from '../controllers/tenant'

const tenantRouter = Router()

tenantRouter.route('/:id').get(getTenantById).patch(updateTenant)

export default tenantRouter
