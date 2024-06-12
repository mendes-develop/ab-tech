

import { jwt } from '@elysiajs/jwt'

export const jwtMiddleware = jwt({
  name: 'jwt',
  secret: 'jwt-secret',
  exp: '1m',
})

export const refreshMiddleware = jwt({
  name: 'jtwRefresh',
  secret: 'jwt-secret',
})

export const SwaggerTags = {
  Auth: {
    tags: ['Auth']
  },
  User: {
    tags: ['User']
  },
  Event: {
    tags: ['Event']
  }
}