Stores are Solid's answer to nested reactivity. They are proxy objects whose properties can be tracked and can contain other objects which automatically become wrapped in proxies themselves, and so on.

To keep things light, Solid creates underlying Signals only for properties that are accessed under tracking scopes. And so, all Signals in Stores are created lazily as requested.

The `createStore` call takes the initial value and returns a read/write tuple similar to Signals. The first element is the store proxy which is readonly, and the second is a setter function.

The setter function in its most basic form takes an object whose properties will be merged with the current state. It also supports path syntax so that we can do nested updates. In this way we can still maintain control of our reactivity but do pinpoint updates.

> Solid's path syntax has many forms and includes some powerful syntax to do iteration and ranges. Refer to the API documentation for a full reference.

Let's look at how much easier it is to achieve nested reactivity with a Store. We can replace the initialization of our component with this:

```js
const [store, setStore] = createStore({ todos: [] });
const addTodo = (text) => {
  setStore('todos', (todos) => [...todos, { id: ++todoId, text, completed: false }]);
};
const toggleTodo = (id) => {
  setStore('todos', (t) => t.id === id, 'completed', (completed) => !completed);
};
```

We make use of the Store's path syntax with function setters that allow us to take the previous state and return the new state on nested values.

And that's it. The rest of the template will already react granularly (check the Console on clicking the checkbox).
