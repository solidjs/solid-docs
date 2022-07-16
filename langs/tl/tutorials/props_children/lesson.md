Part of what makes Solid so performant is that our components are basically just function calls. The way we propagate updates is that the compiler wraps potentially reactive expressions in object getters. You can picture the compiler to output:

```jsx
// this JSX
<MyComp dynamic={mySignal()}>
  <Child />
</MyComp>

// to become
MyComp({
  get dynamic() { return mySignal() },
  get children() { return Child() }
});
```
This means that these props are evaluated lazily. Their access is deferred until where they are used. This retains reactivity without introducing extraneous wrappers or synchronization. However, it means that repeat access can lead to recreating child components or elements.

The vast majority of the time you will just be inserting props into the JSX so there is no problem. However, when you work with children, you need to be careful to avoid creating the children multiple times.

For that reason, Solid has the `children` helper. This method both creates a memo around the `children` prop and resolves any nested child reactive references so that you can interact with the children directly.

In the example, we have a dynamic list and we want to set the items' `color` style property. If we interacted with `props.children` directly, not only would we create the nodes multiple times, but we'd find `props.children` to be a function, the Memo returned from `<For>`.

Instead let's use the `children` helper inside `colored-list.tsx`:
```jsx
export default function ColoredList(props) {
  const c = children(() => props.children);
  return <>{c()}</>
}
```
Now to update our elements, let's create an Effect:
```jsx
createEffect(() => c().forEach(item => item.style.color = props.color));
```
