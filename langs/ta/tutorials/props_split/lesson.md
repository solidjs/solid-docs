Merging props isn't the only props operation we might want to do.

Often, we want to split props into groups, so that we can use some of them on 
the current component but split off others to pass through to child components.

For this purpose, Solid has [`splitProps`](/docs/latest/api#splitprops). It 
takes the props object 
and 
one or more arrays of keys that we want to extract into their own props objects. It returns an array of props objects, one per array of specified keys, plus one props object with any remaining keys. All returned objects preserve reactivity.

Our example doesn't update when we set the name because of lost reactivity when we destructure in `greeting.tsx`:
```jsx
export default function Greeting(props) {
  const { greeting, name, ...others } = props;
  return <h3 {...others}>{greeting} {name}</h3>
}
```

Instead, we can maintain reactivity with `splitProps`:
```jsx
export default function Greeting(props) {
  const [local, others] = splitProps(props, ["greeting", "name"]);
  return <h3 {...others}>{local.greeting} {local.name}</h3>
}
```
Now the button works as expected.