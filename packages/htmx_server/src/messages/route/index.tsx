import Elysia from "elysia";
import * as elements from 'typed-html';

export const messagesRoute = new Elysia({ prefix: '/messages' })
  .get('/', () => {
    return (
      <div>
        <h1>Messages</h1>
      </div>
    )
  })