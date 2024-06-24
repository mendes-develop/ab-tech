import * as elements from 'typed-html';
import { Todo } from '../types';

export const TodoElement = (todo: Todo) => (
  <div class={"border border-red-300 p-2 rounded-md"}>
    <p>{todo.id}</p>
    <p>{todo.title}</p>
    <label>Completed</label>
    <input type="radio" checked={(todo.completed)} />
  </div>
)

export const TodoList = ({ todos }: { todos: Todo[] }) => (
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    {todos.map(todo => <TodoElement {...todo} />)}
  </div>
)