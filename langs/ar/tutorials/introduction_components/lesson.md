As you build your applications, you will want to break apart your code for better modularity and reusability. In Solid, the main way of doing that is by creating components.

Components are just functions like the `HelloWorld()` one we've been using so far. What makes them special is that they typically return JSX and can be called by JSX in other components.

In this example, let's add our `Nested` component to our app. We've defined it in another file, though you can put multiple components in the same file. First we must import it:

```js
import Nested from "./nested";
```

Then we need to add the component to our JSX. Like before, we now have multiple elements we want to return, so we wrap them in a Fragment:

```jsx
function App() {
  return (
    <>
      <h1>This is a Header</h1>
      <Nested />
    </>
  );
}
```

When the parent component first renders, it will execute the `Nested()` function and won't call it ever again. All updates are applied by Solid’s reactivity system which we will cover in the next couple of lessons.
