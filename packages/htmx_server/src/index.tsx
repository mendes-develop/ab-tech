import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import type { Attributes } from 'typed-html'
import * as elements from 'typed-html';
import { staticPlugin } from '@elysiajs/static'
import { TodoList } from './todos/components/Todo';
import { todosRoute } from './todos/routes';
import { Layout } from './Layout';
import { NavBar } from './todos/components/Navigation';
import { messagesRoute } from './messages/route';

const PORT = 4000
const MAX_VIEWS = 5

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get('/', ({ html }) => html(
    <Layout>
      {/*  @ts-ignore */}
      <body class={`h-svh p-4`}>
        <div class="border border-gray-300 rounded-md p-2 flex flex-row gap-4">
          <NavBar />
          <div
            hx-get="/todos"
            hx-trigger="load"
            xh-swape="outerHTML"
          />
        </div>
      </body>
    </Layout>
  ))
  .use(todosRoute)
  .use(messagesRoute)
  .listen(PORT)


console.log(`🦊 server is running on ${app.server?.hostname}:${app.server?.port}`)