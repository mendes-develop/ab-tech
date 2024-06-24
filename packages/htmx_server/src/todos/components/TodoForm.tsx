import * as elements from 'typed-html';
import type { Attributes } from 'typed-html'

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
      <Button
        type="submit"
      >
        Add
      </Button>
    </form>
  );
};

export const Button = ({
  children,
  class: classNames,
  ...props
}: elements.Attributes) => (
  <button
    {...props}
    class={`bg-blue-500 text-white rounded-md p-2 ${classNames}`}
  >
    {children}
  </button>
);