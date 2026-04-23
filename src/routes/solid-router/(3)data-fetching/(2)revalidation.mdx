---
title: "Revalidation"
---

Since server data can change, Solid Router provides mechanisms to revalidate queries and keep the UI up to date.

The most common case is **automatic revalidation**.
After an [action](/solid-router/concepts/actions) completes successfully, Solid Router automatically revalidates all active queries on the page.
For more details, see the [actions documentation](/solid-router/concepts/actions#automatic-data-revalidation).

For more fine-grained control, you can trigger revalidation manually with the [`revalidate` function](/solid-router/reference/data-apis/revalidate).
It accepts a query key (or an array of keys) to target specific queries.
Each query exposes two properties for this: `key` and `keyFor`.

- `query.key` is the base key for a query and targets all of its instances.
  Using this key will revalidate all data fetched by that query, regardless of the arguments provided.
- `query.keyFor(arguments)` generates a key for a specific set of arguments, allowing you to target and revalidate only that particular query.

```tsx
import { For } from "solid-js";
import { query, createAsync, revalidate } from "@solidjs/router";

const getProjectsQuery = query(async () => {
	// ... Fetches a list of projects.
}, "projects");

const getProjectTasksQuery = query(async (projectId: string) => {
	// ... Fetches a list of tasks for a project.
}, "projectTasks");

function Projects() {
	const projects = createAsync(() => getProjectsQuery());

	function refetchAllTasks() {
		revalidate(getProjectTasksQuery.key);
	}

	return (
		<div>
			<button onClick={refetchAllTasks}>Refetch all tasks</button>
			<For each={projects()}>{(project) => <Project id={project.id} />}</For>
		</div>
	);
}

function Project(props: { id: string }) {
	const tasks = createAsync(() => getProjectTasksQuery(props.id));

	function refetchTasks() {
		revalidate(getProjectTasksQuery.keyFor(props.id));
	}

	return (
		<div>
			<button onClick={refetchTasks}>Refetch tasks for this project</button>
			<For each={project.tasks}>{(task) => <div>{task.title}</div>}</For>
		</div>
	);
}
```
