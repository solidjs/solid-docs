Sometimes your components and elements accept a variable number of attributes and it makes sense to pass them down as an object instead of individually. This is especially true when wrapping a DOM element in a component, a common practice when making design systems.

For this we use the spread operator `...`.

We can pass an object with a variable number of properties:

```jsx
<Info {...pkg} />
```
