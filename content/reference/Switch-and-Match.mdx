<Title>{"<Switch> and <Match>"}</Title>

Useful for when there are more than 2 mutual exclusive conditions. It is a more flexible version of the if-else-if-else-if-else-... chain.

```ts
function Switch(props: {
  fallback?: JSX.Element;
  children: JSX.Element;
}): () => JSX.Element;

type MatchProps<T> = {
  when: T | undefined | null | false;
  children: JSX.Element | ((item: T) => JSX.Element);
};
function Match<T>(props: MatchProps<T>);
```

A super simple implementation of this component would be:

```tsx
function Switch(props) {
  let children = props.children;

  if (!Array.isArray(children)) children = [children];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.props.when) return child;
  }

  return props.fallback;
}
```

For example, it can be used to perform basic routing:

```tsx
<Switch fallback={<div>Not Found</div>}>
  <Match when={state.route === "home"}>
    <Home />
  </Match>
  <Match when={state.route === "settings"}>
    <Settings />
  </Match>
</Switch>
```

Match also supports function children to serve as keyed flow.

## Props

### Switch

| Name       | Type          | Default     | Description                                                                      |
| ---------- | ------------- | ----------- | -------------------------------------------------------------------------------- |
| `fallback` | `JSX.Element` | `undefined` | The fallback element to render if no `Match` component has a truthy `when` prop. |

### Match

| Name   | Type                              | Default     | Description                                                               |
| ------ | --------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `when` | `T \| undefined \| null \| false` | `undefined` | The condition to check. If it is truthy, the `children` will be rendered. |
