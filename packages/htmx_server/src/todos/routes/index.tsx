import * as elements from "typed-html";
import Elysia, { t } from "elysia";
import { OOBTodoElement, TodoElement, TodoList } from "../components/Todo";
import { Todo } from "../types";
import { TodoForm } from "../components/TodoForm";
import { faker } from "@faker-js/faker";

const todoFactory = (todo: Pick<Todo, "title" | "userId">) =>
	({
		id: crypto.randomUUID(),
		title: todo.title || faker.git.commitMessage(),
		completed: false,
		userId: todo.userId || 1,
	}) as Todo;

const getTodos = async () => {
	return Array(10).fill({}).map(todoFactory);
};
const todos = await getTodos();

export const todosRoute = new Elysia({ prefix: "/todos" })
	.onBeforeHandle(async ({ cookie: { ronaldo } }) => {
		ronaldo.value = (Number(ronaldo.value) || 0) + 1;
		// get the cookie and see if we can modify
		// if the user is not authenticated, send to somewhere else
	})
	.get("/", async ({ cookie: { ronaldo } }) => {
		console.log(ronaldo.value);

		return (
			<div class={"flex flex-col flex-1 gap-4 overflow-y-scroll"}>
				<TodoForm />
				<TodoList todos={todos} />
			</div>
		);
	})
	.post(
		"/",
		async ({ error, set, body: { name }, cookie: { ronaldo } }) => {
			if (!name || name.length < 3) {
				return error(
					422,
					<TodoForm error="Please provide a name" name={name} />,
				);
			}

			const newTodo = todoFactory({
				title: name,
				userId: ronaldo.value,
			});

			return (
				<div>
					<TodoForm />
					<OOBTodoElement {...newTodo} />
				</div>
			);
		},
		{
			body: t.Object({
				name: t.String(),
			}),
		},
	)
	.post("/:id/completed", async ({ params: { id } }) => {
		const todo = todos.find((todo) => todo.id == id);

		console.log({
			id,
			todos,
		});

		if (!todo) {
			return (
				<div>
					<h2>Todo not found</h2>
				</div>
			);
		}

		return <TodoElement {...todo} completed={!todo.completed} />;
	})
	// .put('/:id', async ({ cookie: { ronaldo }, params: { id } }) => {
	//   const todos = await getTodos()

	//   return (
	//     <div class={"border border-gray-300 rounded-md p-2"}>
	//       <TodoList todos={todos} />
	//     </div>
	//   )
	// }, {
	//   params: t.Object({
	//     id: t.Number()
	//   })
	// })
	.delete(
		"/:id",
		async ({ params: { id }, set }) => {
			// remove from the database and return nothing
			console.log(id);
		},
		{
			params: t.Object({
				id: t.String(),
			}),
		},
	);
