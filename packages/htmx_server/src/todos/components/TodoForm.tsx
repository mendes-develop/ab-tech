import * as elements from 'typed-html';
import type { Attributes } from 'typed-html'

const Loader = () =>
  <div id="spinner" class="htmx-indicator h-10 w-10">
    <img src="/public/loading.svg" />
  </div>

export const TodoForm = ({ error, name = "" }: { error?: string, name?: string }) => {
  return (
    <div id="form">
      <form
        class="flex flex-col gap-2"
        hx-trigger="submit delay:1000ms"
        hx-post="/todos"
        hx-swap="outerHTML"
        hx-target="#form"
        hx-indicator="#spinner"
      >
        <input
          class="border border-gray-300 rounded-md p-2"
          type="text"
          name="name"
          value={name}
          placeholder="Add todo"
        />
        {error ? <span class="text-red-500">{error}</span> : null}
        <Button
          type="submit"
        >
          <span class="button-text">
            Add
          </span>
        </Button>
      </form>
      <Loader />
      <h1 x-data="{ message: 'I ❤️ HTMX' }" x-text="message"></h1>
    </div>

  );
};

export const Button = ({
  children,
  class: classNames,
  ...props
}: elements.Attributes) => (
  <button
    {...props}
    class={`bg-pink-200 border border-gray-300 text-white rounded-md p-2 ${classNames}`}
  >
    {children}
  </button>
);