

import { jwt } from '@elysiajs/jwt'

export const jwtMiddleware = jwt({
  name: 'jwt',
  secret: 'jwt-secret',
  exp: '5m',
})