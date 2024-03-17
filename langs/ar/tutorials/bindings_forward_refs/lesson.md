On many occassions, you might want to expose a ref from inside a component to a parent. The way we do this is still by using the `ref` attribute. From the outside, using `ref` on a component works very similar to using `ref` on a native element. You can pass it a variable to be assigned or a callback function.

However, it is the component author's responsibility to connect that `ref` to an internal element to forward it back up. To do so, we leverage `props.ref`. This is a callback form of `ref` if either type of `ref` is given, but this detail is mostly hidden from you as you will more than likely just be assigning it directly to the `ref` attribute of one of the elements or components in this component's JSX.

To get the logo animating again, we need to forward the ref from `canvas.tsx`:

```jsx
<canvas ref={props.ref} width="256" height="256" />
```
