import { JwtPayload } from 'jsonwebtoken'

type Payload =
  | {
      tenantId: string
    }
  | JwtPayload

export default Payload
