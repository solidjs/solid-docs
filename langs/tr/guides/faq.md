# FAQ

### JSX without a virtual DOM? Is this vaporware? I've heard prominent voices say that this isn't possible.

It is possible when you don't have React's update model. JSX is a template language like those in Svelte or Vue—just one that is more flexible in certain ways. Inserting arbitrary JavaScript can be challenging at times, but no different than supporting spread operators. So, no: this isn't vaporware, but an approach proven to be one of the most performant.

The real benefit comes in how extensible it is. We have a compiler working for you to give you optimal native DOM updates, but you have all the freedom of a library like React. You can write components using standard techniques like [render props](https://reactjs.org/docs/render-props.html) and higher order components along side your reactive "hooks". Don't like how Solid's control flow works? Write your own.

### How is Solid so performant?

We wish we could point to a single thing, but it really is the combination of several important design decisions:

1. Explicit reactivity, so only the things that should be reactive are tracked.
2. Compilation with initial creation in mind. Solid uses heuristics and combines the right expressions to reduce the number of computations, but keep key updates granular and performant.
3. Reactive expressions are just functions. This enables "vanishing components" with lazy prop evaluation removing unnecessary wrappers and synchronization overhead.

These are currently unique techniques in a combination that gives Solid an edge over the competition.

### Is there React-Compat, or some way to use my React libraries in Solid?

No. And there likely never will be. While the APIs are similar and components often can be moved across with minor edits, the update model is fundamentally different. React Components render over and over so code outside of Hooks works very differently. The closures and hook rules are not only unnecessary in Solid: they can prescribe code that does not work here.

Vue-Compat, on the other hand, would be doable, although there are no plans to implement it currently.

On the other hand, it is possible to run Solid _within_ React. [React Solid State](https://github.com/solidjs/react-solid-state) makes the Solid API accessible in React function components. [reactjs-solidjs-bridge](https://github.com/Sawtaytoes/reactjs-solidjs-bridge) lets you render React components within Solid components and vice versa, which is useful when gradually porting an app.

### Why shouldn't I use `map` in my template, and what's the difference between `<For>` and `<Index>`?

If your array is static, there's nothing wrong with using map. But if you're looping over a signal or reactive property, `map` is inefficient: if the array changes for any reason, _the entire map_ will rerun and all of the nodes will be recreated.

`<For>` and `<Index>` both provide a loop solution that is smarter than this. They couple each rendered node with an element in the array, so when an array element changes, only the corresponding node will rerender.

`<Index>` will do this _by index_: each node corresponds to an index in the array; `<For>` will do this _by value_: each node corresponds to a piece of data in the array. This is why, in the callback, `<Index>` gives you a signal for the item: the index for each item is considered fixed, but the data at that index can change. On the other hand, `<For>` gives you a signal for the index: the content of the item is considered fixed, but it can move around if elements get moved in the array.

For example, if two elements in the array are swapped, `<For>` will reposition the two corresponding DOM nodes and update their `index()` signals along the way. `<Index>` won't reposition any DOM nodes, but will update the `item()` signals for the two DOM nodes and cause them to rerender.

For an in-depth demonstration of the difference, see [this segment](https://www.youtube.com/watch?v=YxroH_MXuhw&t=2164s) of Ryan's stream.

### Why do I lose reactivity when I destructure props?

With a props object, reactivity is enabled by tracking on property access.
If you access the property within a _tracking scope_
like a JSX expression or an effect, then the JSX expression will rerender or the effect will rerun when that property changes.

When you destructure, you access the properties of the object. If this takes place outside of a tracking scope, Solid won't track and rerun
your code.

In this example, the property access happens within the JSX template, so it's
tracked and the span contents update when the signal changes:

```jsx
function BlueText(props) {
  return (
    <span style="color: blue">{props.text}</span>
  );
}
...
<BlueText text={mySignal()}/>
```

But neither of these examples will update the span text because the property access happens
outside of the template:

```jsx
function BlueText(props) {
  const text = props.text;
  return (
    <span style="color: blue">{text}</span>
  );
}
...
<BlueText text={mySignal()}/>
```

```jsx
function BlueText({text}) {
  return (
    <span style="color: blue">{text}</span>
  );
}
...
<BlueText text={mySignal()}/>
```

If you prefer the style of early destructuring, though, there are two different Babel
transforms you can use to make (certain styles of) destructuring reactive
again: [babel-plugin-solid-undestructure](https://github.com/orenelbaum/babel-plugin-solid-undestructure)
and [Solid Labels'](https://github.com/LXSMNSYC/solid-labels) [object features](https://github.com/LXSMNSYC/solid-labels/blob/main/docs/ctf.md#objects).

### Why isn't my `onChange` event handler firing on time?

In some frameworks, the `onChange` event for inputs is modified so that it fires on every key press. But this isn't how the `onChange` event [works natively](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange): it is meant to reflect a _committed_ change to the input and will usually fire when the input loses focus. To handle all changes to the value of an input, use `onInput`.

### Can you add support for class components? I find the lifecycles are easier to reason about.

We don't intend to support class components. The lifecycles of components in Solid are tied to the scheduling of the reactive system and are artificial. You could make a class out of it, but effectively all of the non-event handler code would be run in the constructor, including the render function. It's just more syntax for an excuse to make your data less granular.

Group data and its behaviors together, rather than lifecycles. This is a reactive best practice that has worked for decades.

### I really dislike JSX, any chance of a different template language? Oh, I see you have Tagged Template Literals/HyperScript. Maybe I will use those...

We use JSX the way Svelte uses their templates, to create optimized DOM instructions. The Tagged Template Literal and HyperScript solutions may be really impressive in their own right, but unless you have a real reason like a no-build requirement they are inferior in every way. Larger bundles, slower performance, and the need for manual workaround wrapping values.

It's good to have options, but Solid's JSX is really the best solution here. A Template DSL would be great as well, albeit more restrictive, but JSX gives us so much for free. Existing Parsers, Syntax Highlighting, Prettier, Code Completion, and last but not least TypeScript.

Other libraries have been adding support for these features but that has been an enormous effort and is still imperfect and a constant maintenance headache. This is really taking a pragmatic stance.

### When do I use a Signal vs Store? Why are these different?

Stores automatically wrap nested values making it ideal for deep data structures, and for things like models. For most other things Signals are lightweight and do the job wonderfully.

As much we would love to wrap these together as a single thing, you can't proxy primitive values, so in this case we use functions. Any reactive expression (including state access) can be wrapped in a function on transport, so this provides a universal API. You can name your signals and state as you choose and it stays minimal. Last thing we'd want to do is force typing `.get()` `.set()` on the end-user or even worse `.value`. At least the former can be aliased for brevity, whereas the latter is just the least terse way to call a function.

### Why can I not just assign a value to Solid's Store as I can in Vue, Svelte, or MobX? Where is the 2-way binding?

Reactivity is a powerful tool but also a dangerous one. MobX knows this and introduced Strict mode and Actions to limit where/when updates occur. In Solid, which deals with whole Component trees of data, it became apparent that we can learn something from React here. You don't need to be actually immutable as long as you provide the means to have the same contract.

Being able to pass the ability to update state is arguably even more important than deciding to pass the state. So being able to separate it is important, and only possible if reading is immutable. We also don't need to pay the cost of immutability if we can still granularly update. Luckily there are tons of prior art here between ImmutableJS and Immer. Ironically Solid acts mostly as a reverse Immer with its mutable internals and immutable interface.

### Can I use Solid's reactivity on its own?

Of course. While we haven't exported a standalone package it is easy to install Solid without the compiler and just use the reactive primitives. One of the benefits of granular reactivity is it is library agnostic. For that matter, almost every reactive library works this way. That is what inspired [Solid](https://github.com/solidjs/solid) and its underlying [DOM Expressions library](https://github.com/ryansolid/dom-expressions) in the first place to make a renderer purely from the reactive system.

To list a few to try: [Solid](https://github.com/solidjs/solid), [MobX](https://github.com/mobxjs/mobx), [Knockout](https://github.com/knockout/knockout), [Svelte](https://github.com/sveltejs/svelte), [S.js](https://github.com/adamhaile/S), [CellX](https://github.com/Riim/cellx), [Derivable](https://github.com/ds300/derivablejs), [Sinuous](https://github.com/luwes/sinuous), and even recently [Vue](https://github.com/vuejs/vue). Much more goes into making a reactive library than tagging it onto a renderer like, [lit-html](https://github.com/Polymer/lit-html) for example, but it's a good way to get a feel.

### Does Solid have a Next.js or Material Components like library I can use?

We're working on [SolidStart](https://github.com/solidjs/solid-start), which is our SSR starter solution similar to Next.js or SvelteKit.

For component libraries, we've got [SUID](https://suid.io/) for Material, [Hope UI](https://hope-ui.com/) for a Chakra-like solution, [Solid Bootstrap](https://solid-libs.github.io/solid-bootstrap/) and plenty more! Check out our [rapidly growing ecosystem of libraries and tools](https://www.solidjs.com/ecosystem).

If you are interested in building your own ecosystem tool, we are readily available on our [Discord](https://discord.com/invite/solidjs), where you can join existing ecosystem efforts or start your own.
