<Title>createContext</Title>

```ts
interface Context<T> {
  id: symbol;
  Provider: (props: { value: T; children: any }) => any;
  defaultValue: T;
}

function createContext<T>(defaultValue?: T): Context<T | undefined>;
```

Context provides a form of dependency injection in Solid. It is used to save from needing to pass data as props through intermediate components.

This function creates a new context object that can be used with [useContext](/references/api-reference/component-apis/useContext) and provides the Provider control flow. Default Context is used when no Provider is found above in the hierarchy.

```tsx
export const CounterContext = createContext([{ count: 0 }, {}]);

export function CounterProvider(props) {
  const [state, setState] = createStore({ count: props.count || 0 });
  const counter = [
    state,
    {
      increment() {
        setState("count", (c) => c + 1);
      },
      decrement() {
        setState("count", (c) => c - 1);
      },
    },
  ];

  return (
    <CounterContext.Provider value={counter}>
      {props.children}
    </CounterContext.Provider>
  );
}
```

The value passed to provider is passed to `useContext` as is. That means wrapping as a reactive expression will not work. You should pass in Signals and Stores directly instead of accessing them in the JSX.

## Default value

`createContext()` takes an optional "default value" as an argument. If `useContext` is called and there is no corresponding
context provider above it in the component hierarchy, then the value passed as `defaultValue` is returned.
However, if no `defaultValue` was passed, then `undefined` is returned in this case. Also, `defaultValue` (or `undefined`) is
returned if `useContext` is called inside an event callback, as it is then outside of the component hierarchy.

This has implications for TS. If no `defaultValue` is passed, then it is possible that `useContext()` will return `undefined`,
and the types reflect this.

## Common issues with `createContext` and `useContext`

As described in the previous section, it is possible for `useContext` to return `undefined`.

Because of this, if an initial value was not passed to `createContext`, the TS type signature of `useContext` will indicate that
the value returned might be `undefined` (as mentioned above). This can be quite annoying when you want to use the context inside
a component, and particulary when immediately destructuring the context. Additionally, if you use `useContext` and it returns
`undefined` (which is often, but not always, the result of a bug), the error message thrown at runtime can be confusing.

There are two approaches to prevent these issues. One approach, which generally works well, is to wrap all uses of `useContext`
in a function that will explicitly throw a helpful error if the context is `undefined`. This also serves to narrow the type returned,
so TS doesn't complain. As an example:

```ts
function useCounterContext() {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error("useCounterContext: cannot find a CounterContext")
    }
    return context;
}
```

Another (used in the example in the previous section) is provide a default value to `createContext()`. In that case,
`useContext()` will always return a value, and therefore TS will not complain either. The pitfall with this approach is that if
you _unintentionally_ use `useContext` outside of a provider, it may not be immediately apparent, because the context is still
providing a valid value. Therefore, if you expect to always use `useContext` within a provider, it is best to use the error based
approach described above.
