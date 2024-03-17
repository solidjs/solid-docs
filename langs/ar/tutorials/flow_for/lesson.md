The `<For>` component is the best way to loop over an array of objects. As the array changes, `<For>` updates or moves items in the DOM rather than recreating them. Let's look at an example. 

```jsx
<For each={cats()}>{(cat, i) =>
  <li>
    <a target="_blank" href={`https://www.youtube.com/watch?v=${cat.id}`}>
      {i() + 1}: {cat.name}
    </a>
  </li>
}</For>
```

There is one prop on the `<For>` component: `each`, where you pass the array to loop over.

Then, instead of writing nodes directly between `<For>` and `</For>`, you pass a _callback_. This is a function similar to JavaScript's [`map` callback](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#parameters). For each element in the array, the callback is called with the element as the first argument and the index as the second. (`cat` and `i` in this example.) You can then make use of those in the callback, which should return a node to be rendered.

Note that the index is a _signal_, not a constant number. This is because `<For>` is "keyed by reference": each node that it renders is coupled to an element in the array. In other words, if an element changes placement in the array, rather than being destroyed and recreated, the corresponding node will move too and its index will change.

The `each` prop expects an array, but you can turn other iterable objects into arrays with utilities like [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), or [`spread syntax`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).
