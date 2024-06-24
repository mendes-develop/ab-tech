import * as elements from 'typed-html';

export const TodoForm = () => {
  return (
    <form
      class="flex flex-col gap-2"
      hx-post="/todos"
      hx-swap="afterend"
    >
      <input
        class="border border-gray-300 rounded-md p-2"
        type="text"
        name="name"
        placeholder="Add todo"
      />
      <button
        class="bg-blue-500 text-white rounded-md p-2"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};