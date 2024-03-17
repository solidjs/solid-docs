You can always get a reference to a DOM element in Solid through assignment, since JSX creates actual DOM elements. For example:

```jsx
const myDiv = <div>My Element</div>;
```

However, there is benefit to not breaking your elements out and instead putting them in a single contiguous JSX template, as it allows Solid to better optimize their creation.

Instead you can get a reference to an element in Solid using the `ref` attribute. Refs are basically assignments like the example above, which happen at creation time before they are attached to the document DOM. Simply declare a variable and it will be assigned to:

```jsx
let myDiv;

<div ref={myDiv}>My Element</div>
```

So let's get a reference to our canvas element and animate it:

```jsx
<canvas ref={canvas} width="256" height="256" />
```

Refs can also take the form of a callback function. This can be convenient for encapsulating logic, especially when you don't need to wait until the elements are attached. For example:

```jsx
<div ref={el => /* do something with el... */}>My Element</div>
```
