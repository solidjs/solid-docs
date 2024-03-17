_Signals_ are the cornerstone of reactivity in Solid. They contain values that change over time; when you change a signal's value, it automatically updates anything that uses it.

To create a signal, let's import `createSignal` from `solid-js` and call it from our Counter component like this:
```jsx
const [count, setCount] = createSignal(0);
```

The argument passed to the create call is the initial value, and the return value is an array with two functions, a getter and a setter. By [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), we can name these functions whatever we like. In this case, we name the getter `count` and the setter `setCount`.

It is important to notice that the first returned value is a getter (a function returning the current value) and not the value itself. This is because the framework needs to keep track of where that signal is read so it can update things accordingly.

In this lesson, we'll use JavaScript's `setInterval` function to create a periodically incrementing counter. We can update our `count` signal every second by adding this code to our Counter component:

```jsx
setInterval(() => setCount(count() + 1), 1000);
```

Each tick, we read the previous count, add 1, and set the new value.

> Solid's signals also accept a function form where you can use the previous value to set the next value.
> ```jsx
> setCount(c => c + 1);
> ```

Finally, we need to read the signal in our JSX code:

```jsx
return <div>Count: {count()}</div>;
```
