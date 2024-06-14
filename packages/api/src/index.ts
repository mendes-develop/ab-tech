import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/', () => 'hello')
  .get('/hi', () => ({
    hello: 123
  }))
  .listen(4001)

console.log('🦊 server started at http://localhost:4001')

export type App = typeof app