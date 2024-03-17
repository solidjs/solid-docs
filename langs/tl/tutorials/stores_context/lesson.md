Solid provides a Context API to pass data around without relying on passing through props. This is useful for sharing Signals and Stores. Using Context has the benefit of being created as part of the reactive system and managed by it.

To get started we create a Context object. This object contains a `Provider` component used to inject our data. However, it is common practice to wrap the `Provider` components and `useContext` consumers with versions already configured for the specific Context.

And that's exactly what we have in this tutorial. You can see the definition for a simple counter store in the `counter.tsx` file.

To use context, first let's wrap our App component to provide it globally. We will use our wrapped `CounterProvider`. In this case let's give it an initial count of 1.

```jsx
render(() => (
  <CounterProvider count={1}>
    <App />
  </CounterProvider>
), document.getElementById("app"));
```

Next we need to consume the counter context in our `nested.tsx` component. We do this by using the wrapped `useCounter` consumer.

```jsx
const [count, { increment, decrement }] = useCounter();
return (
  <>
    <div>{count()}</div>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </>
);
```