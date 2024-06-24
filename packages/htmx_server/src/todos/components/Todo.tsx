import * as elements from 'typed-html';
import { Todo } from '../types';
import { Button } from './TodoForm';

const TrashCan = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10 11V17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14 11V17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

export const TodoElement = (todo: Todo) => (
  <div id={"todo" + todo.id} class={"border border-red-300 p-2 rounded-md"}>
    <p>{todo.id}</p>
    <p>{todo.title}</p>
    <label>Completed </label>
    <input
      type="checkbox"
      checked={(todo.completed)}
      hx-post={`/todos/${todo.id}/completed`}
      hx-swap="outerHTML"
      hx-target={"#todo" + todo.id}
    />
    <div class="flex w-full justify-end items-center">
      <Button
        hx-delete={`/todos/${todo.id}`}
        hx-swap={"outerHTML"}
        hx-target={"#todo" + todo.id}
      >
        <TrashCan />
      </Button>
    </div>
  </div>
)

export const TodoList = ({ todos }: { todos: Todo[] }) => (
  <div class={"border border-gray-300 rounded-md p-2 flex flex-1  flex-col gap-4 w-full"}>
    <h1 x-data="{ message: 'I ❤️ Alpine' }" x-text="message"></h1>
    {todos.map(todo => <TodoElement {...todo} />)}
  </div>
)