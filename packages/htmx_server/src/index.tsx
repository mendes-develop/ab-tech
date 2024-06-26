import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html';
import { staticPlugin } from '@elysiajs/static'
import { TodoList } from './todos/components/Todo';
import { todosRoute } from './todos/routes';
import { Layout } from './Layout';
import { NavBar } from './todos/components/Navigation';
import { messagesRoute } from './messages/route';
import { swagger } from '@elysiajs/swagger';

const PORT = 4000
const MAX_VIEWS = 5

console.log("🚀 Starting htmx server")

const app = new Elysia()
  .use(swagger())
  .use(html())
  .use(staticPlugin({ assets: `${import.meta.dir}/../public` }))
  .get('/', ({ html }) => html(
    <Layout route={"/"}>
      <div
        hx-get="/todos"
        hx-trigger="load"
        hx-swape="outerHTML"
        class="flex flex-1 flex-col p-2"
      />
    </Layout>
  ))
  .get("/test", async () => {
    return "test"
  })
  .use(todosRoute)
  .use(messagesRoute)
  .listen(PORT)

// app.routes.forEach(route => {
//   console.log(`🚀 ${route.method} ${route.path}`)
// })

console.log(`🦊 server is running on ${app.server?.hostname}:${app.server?.port}`)

