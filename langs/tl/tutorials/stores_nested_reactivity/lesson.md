One of the reasons for fine-grained reactivity in Solid is that it can handle nested updates independently. You can have a list of users and when we update one name we only update a single location in the DOM without diffing the list itself. Very few (even reactive) UI frameworks can do this.

But how do we accomplish this? In the example we have a list of todos in a signal. In order to mark a todo as complete, we would need to replace the todo with a clone. This is how most frameworks work, but it's wasteful as we rerun the list diffing and we recreate the DOM elements as illustrated in the `console.log`.

```js
const toggleTodo = (id) => {
  setTodos(
    todos().map((todo) => (todo.id !== id ? todo : { ...todo, completed: !todo.completed })),
  );
};
```

Instead, in a fine-grained library like Solid, we initialize the data with nested Signals like this:

```js
const addTodo = (text) => {
  const [completed, setCompleted] = createSignal(false);
  setTodos([...todos(), { id: ++todoId, text, completed, setCompleted }]);
};
```

Now we can update the completion state by calling `setCompleted` without any additional diffing. This is because we've moved the complexity to the data rather than the view. And we know exactly how the data changes.

```js
const toggleTodo = (id) => {
  const index = todos().findIndex((t) => t.id === id);
  const todo = todos()[index];
  if (todo) todo.setCompleted(!todo.completed())
}
```
If you change the remaining references of `todo.completed` to `todo.completed()`, the example should now only run the `console.log` on creation and not when you toggle a todo.

This of course requires some manual mapping and it was the only choice available to us in the past. But now, thanks to proxies, we can do most of this work in the background without manual intervention. Continue to the next tutorials to see how.
