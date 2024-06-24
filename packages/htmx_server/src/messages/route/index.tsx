import Elysia from "elysia";
import * as elements from 'typed-html';
import { Counter, Toggle } from "../../apine/Counter";
import { html } from "@elysiajs/html";
import { Layout } from "../../Layout";

export const messagesRoute = new Elysia({ prefix: '/messages' })
  .use(html())
  .get('/', ({ html }) => {
    return html(
      <Layout>
        <div>
          <h1>Messages</h1>
          <Counter />
          <Toggle />
        </div>
      </Layout>
    )
  })