Merging props is not the only operation we can do. Often we use destructuring to use some of the props on the current component but then split off others to pass through to child components.

For this purpose, Solid has `splitProps`. It takes the props object and one or more arrays of keys that we want to extract into their own props objects. It returns an array of props objects, one per array of specified keys, plus one props object with any remaining keys, similar to the rest parameter. All returned objects preserve reactivity.

Our example doesn't update when we set the name because of lost reactivity when we destructure in `greeting.tsx`:
```jsx
export default function Greeting(props) {
  const { greeting, name, ...others } = props;
  return <h3 {...others}>{greeting} {name}</h3>
}
```

Instead we can maintain reactivity with `splitProps`:
```jsx
export default function Greeting(props) {
  const [local, others] = splitProps(props, ["greeting", "name"]);
  return <h3 {...others}>{local.greeting} {local.name}</h3>
}
```
Now the button works as expected.
