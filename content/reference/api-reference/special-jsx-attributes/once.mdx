<Title>{"/*@once*/"}</Title>

Solid's compiler uses a heuristic for reactive wrapping and lazy evaluation of JSX expressions. Does it contain a function call, a property access, or JSX? If yes we wrap it in a getter when passed to components or in an effect if passed to native elements.

Knowing this heuristic and its limitations, we can reduce overhead of things we know will never change by accessing them outside of the JSX. A lone variable will never be wrapped. We can also tell the compiler not to wrap them by starting the expression with a comment decorator `/* @once */`.

```tsx
<MyComponent static={/*@once*/ state.wontUpdate} />
```

This also works on children.

```tsx
<MyComponent>
  {/*@once*/ state.wontUpdate}
</MyComponent>
```