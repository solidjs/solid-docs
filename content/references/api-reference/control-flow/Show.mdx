<Title>{"<Show>"}</Title>

The Show control flow is used to conditional render part of the view: it renders children when the when is truthy, a fallback otherwise. It is similar to the ternary operator `(when ? children : fallback)` but is ideal for templating JSX.

```ts
function Show<T>(props: {
  when: T | undefined | null | false;
  keyed: boolean;
  fallback?: JSX.Element;
  children: JSX.Element | ((item: () => T) => JSX.Element) | ((item: T) => JSX.Element);
}): JSX.Element;
```

Here's an example of using the Show control flow:

```tsx
<Show when={state.count > 0} fallback={<div>Loading...</div>}>
  <div>My Content</div>
</Show>
```

Show can also be used with a callback that returns a null asserted accessor. Remember to only use this accessor when the condition is true or it will throw.

```tsx
<Show when={state.user} fallback={<div>Loading...</div>}>
  {(user) => <div>{user().firstName}</div>}
</Show>
```

Show can also be used as a way of keying blocks to a specific data model. For example the function is re-executed whenever the user model is replaced.

```tsx
<Show when={state.user} fallback={<div>Loading...</div>} keyed>
  {(user) => <div>{user.firstName}</div>}
</Show>
```

## Props

| Name       | Type                              | Description                                   |
| :--------- | :-------------------------------- | :-------------------------------------------- |
| `when`     | `T \| undefined \| null \| false` | The value to test for truthiness              |
| `keyed`    | `boolean`                         | Whether to key the block to the value of when |
| `fallback` | `JSX.Element`                     | The fallback to render when when is falsy     |
