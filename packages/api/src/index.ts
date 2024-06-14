import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/', () => 'hello')
  .get('/hi', () => ({
    hello: 123
  }))
  .listen(3000)

export type App = typeof app