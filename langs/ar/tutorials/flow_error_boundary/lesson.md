A JavaScript error originating in the UI shouldn’t break the whole app. Error boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

A component has crashed our example. Let's wrap it in an Error Boundary that displays the error.

```jsx
<ErrorBoundary fallback={err => err}>
  <Broken />
</ErrorBoundary>
```
