<Title>on*</Title>

Event handlers in Solid typically take the form of onclick or onClick depending on style.

Solid uses semi-synthetic event delegation for common UI events that are composed and bubble. This improves performance for these common events.

```tsx
<div onClick={(e) => console.log(e.currentTarget)} />
```

Solid also supports passing an array to the event handler to bind a value to the first argument of the event handler. This doesn't use `bind` or create an additional closure, so it is a highly optimized way of delegating events.

```tsx
function handler(itemId, e) {
  /*...*/
}

<ul>
  <For each={state.list}>{(item) => <li onClick={[handler, item.id]} />}</For>
</ul>;
```

Events are never rebound and the bindings are not reactive, as it is expensive to attach and detach listeners. Since event handlers are called like any other function each time an event fires, there is no need for reactivity; shortcut your handler if desired.

```tsx
// if defined, call it; otherwise don't.
<div onClick={() => props.handleClick?.()} />
```

Note that `onChange` and `onInput` work according to their native behavior. `onInput` will fire immediately after the value has changed; for `<input>` fields, `onChange` will only fire after the field loses focus.