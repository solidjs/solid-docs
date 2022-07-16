We've seen that whenever we access a signal in JSX, it will automatically update the view when that signal changes. But the component function itself only executes once. 

We can create new expressions that depend on signals by wrapping a signal in a function. A function that accesses a signal is effectively also a signal:  when its wrapped signal changes it will in turn update its readers.


Let's update our Counter to count by 2 by introducing a `doubleCount` function:

```jsx
const doubleCount = () => count() * 2;
```

We can then call `doubleCount` just like a signal in our JSX: 
```jsx
return <div>Count: {doubleCount()}</div>;
```

We call functions like these _derived signals_ because they gain their reactivity from the signal they access. They don't themselves store a value (if you create a derived signal but never call it, it will be stripped from Solid's output like any unused function) but they'll update any effects that depend on them, and they'll trigger a rerender if included in a view.