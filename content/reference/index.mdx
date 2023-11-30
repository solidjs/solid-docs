<Title>{"<Index>"}</Title>

Non-keyed list iteration (rendered nodes are keyed to an array index). This is useful when there is no conceptual key, like if the data consists of primitives and it is the index that is fixed rather than the value.

```ts
function Index<T, U extends JSX.Element>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: () => T, index: number) => U;
}): () => U[];
```

A super simple implementation of this component might look like this:

```tsx
function Index<T, U extends JSX.Element>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: () => T, index: number) => U;
}) {
  return () => {
    const [items, setItems] = createSignal(props.each);
    return props.each.map((_, i) => props.children(() => items()[i], i));
  };
}
```

Here's a look at the implementation of the `Index` component in Solid:

```tsx
<Index each={state.list} fallback={<div>Loading...</div>}>
  {(item) => <div>{item()}</div>}
</Index>
```

Notice that the item is a signal unlike the `For` component. This is because the `Index` component is not keyed to the item itself but rather the index.

Optional second argument is an index number:

```tsx
<Index each={state.list} fallback={<div>Loading...</div>}>
  {(item, index) => (
    <div>
      #{index} {item()}
    </div>
  )}
</Index>
```

## Props

| Name     | Type                                  | Description                                                     |
| :------- | :------------------------------------ | :-------------------------------------------------------------- |
| each     | `readonly T[]`                        | The array to iterate over.                                      |
| fallback | `JSX.Element`                         | Optional fallback element to render while the array is loading. |
| children | `(item: () => T, index: number) => U` | The function that renders the children.                         |
