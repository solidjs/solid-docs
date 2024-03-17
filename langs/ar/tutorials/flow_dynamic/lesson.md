The `<Dynamic>` tag is useful when you render from data. It lets you pass either a string for a native element or a component function and it will render that with the rest of the provided props.

This is often more compact than writing a number of `<Show>` or `<Switch>` components.

In the example, we can replace the `<Switch>` statement:

```jsx
<Switch fallback={<BlueThing />}>
  <Match when={selected() === 'red'}><RedThing /></Match>
  <Match when={selected() === 'green'}><GreenThing /></Match>
</Switch>
```

with:

```jsx
<Dynamic component={options[selected()]} />
```
