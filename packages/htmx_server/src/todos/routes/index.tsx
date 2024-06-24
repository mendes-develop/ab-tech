import * as elements from 'typed-html';
import Elysia, { t } from "elysia";
import { TodoElement, TodoList } from "../components/Todo";
import { Todo } from '../types';
import { TodoForm } from '../components/TodoForm';

const getTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  const todos = (await response.json() as Todo[])
  return todos.slice(0, 10)
}

export const todosRoute = new Elysia({ prefix: '/todos' })
  .onBeforeHandle(async ({ cookie: { ronaldo } }) => {
    ronaldo.value = (Number(ronaldo.value) || 0) + 1
    // get the cookie and see if we can modify 
    // if the user is not authenticated, send to somewhere else
  })
  .get('/', async ({ cookie: { ronaldo } }) => {
    const todos = await getTodos()
    console.log(ronaldo.value)

    return (
      <div class={"border border-gray-300 rounded-md p-2 flex  flex-col gap-4"}>
        <TodoForm />
        <TodoList todos={todos} />
      </div>
    )
  })
  .post('/', async ({ body: { name }, cookie: { ronaldo } }) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: name,
      completed: false,
      userId: ronaldo.value
    } as Todo

    return (
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <TodoElement {...newTodo} />
      </div>
    )
  }, {
    body: t.Object({
      name: t.String(),
    })
  })
  .put('/:id', async ({ cookie: { ronaldo }, params: { id } }) => {
    const todos = await getTodos()

    return (
      <div class={"border border-gray-300 rounded-md p-2"}>
        <TodoList todos={todos} />
      </div>
    )
  }, {
    params: t.Object({
      id: t.Number()
    })
  })