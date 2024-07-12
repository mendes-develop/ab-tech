import { jwt } from '@elysiajs/jwt';

if (!Bun.env.REFRESH_SECRET || !Bun.env.TOKEN_SECRET) {
  throw new Error('Missing environment variables')
}

const JWTRefreshToken = jwt({
  name: 'refresh_token',
  secret: Bun.env.REFRESH_SECRET,
  expiresIn: '1w',
})

const JWToken = jwt({
  name: 'jwt_token',
  secret: Bun.env.TOKEN_SECRET,
  expiresIn: '15m',
})

export { JWTRefreshToken, JWToken }