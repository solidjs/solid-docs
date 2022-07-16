Solid strongly recommends the use of shallow immutable patterns for updating state. By separating reads and writes we maintain better control over the reactivity of our system without the risk of losing track of changes to our proxy when passed through layers of components. This is much more amplified with Stores compared to Signals.

Sometimes, however, mutation is just easier to reason about. That's why Solid provides an Immer inspired `produce` store modifier that allows you to mutate a writable proxy version of your Store object inside your `setStore` calls.

This is a nice tool to have to allow small zones of mutation without relinquishing control. Let's use `produce` on our Todos example by replacing our event handler code with:

```jsx
const addTodo = (text) => {
  setStore(
    'todos',
    produce((todos) => {
      todos.push({ id: ++todoId, text, completed: false });
    }),
  );
};
const toggleTodo = (id) => {
  setStore(
    'todos',
    todo => todo.id === id,
    produce((todo) => (todo.completed = !todo.completed)),
  );
};
```

While `produce` with Stores probably handles the vast majority of cases, Solid also has a mutable Store object that is available from `createMutable`. While not the recommended approach for internal APIs, it is sometimes useful for interop or compatibility with 3rd party systems.
