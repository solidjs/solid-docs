import {Aside} from '~/components/configurable/Aside'

<Title>classList</Title>

Solid offers two ways to set the class of an element: class and classList attributes.

First, you can set class=... like any other attribute. For example:

```tsx
// Two static classes
<div class="active editing" />

// One dynamic class, deleting class attribute if it's not needed
<div class={state.active ? 'active' : undefined} />

// Two dynamic classes
<div class={`${state.active ? 'active' : ''} ${state.currentId === row.id ? 'editing' : ''}`} />
```

<Aside>
  Note that <code>className</code> was deprecated in Solid 1.4 in favor of <code>class</code>.
</Aside>

Alternatively, the `classList` pseudo-attribute lets you specify an object, where each key is a class and the value is treated as a boolean representing whether to include that class. For example (matching the last example):

```tsx
<div
  classList={{ active: state.active, editing: state.currentId === row.id }}
/>
```

This example compiles to a render effect that dynamically calls [element.classList.toggle](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle) to turn each class on or off, only when the corresponding boolean changes. For example, when `state.active` becomes true [false], the element gains [loses] the `active` class.

The value passed into `classList` can be any expression (including a signal getter) that evaluates to an appropriate object. Some examples:

```tsx
// Dynamic class name and value
<div classList={{ [className()]: classOn() }} />;

// Signal class list
const [classes, setClasses] = createSignal({});
setClasses((c) => ({ ...c, active: true }));
<div classList={classes()} />;
```

It's also possible, but dangerous, to mix class and classList. The main safe situation is when class is set to a static string (or nothing), and classList is reactive. (class could also be set to a static computed value as in `class={baseClass()}`, but then it should appear before any classList pseudo-attributes.) If both class and classList are reactive, you can get unexpected behavior: when the class value changes, Solid sets the entire class attribute, so will overwrite any toggles made by classList.

Because classList is a compile-time pseudo-attribute, it does not work in a prop spread like `<div {...props} />` or in `<Dynamic>`.