Sometimes it's beneficial to insert elements outside the normal flow of the app. Z-indexes are sometimes insufficient to deal with render contexts for floating elements like Modals.

Solid has a `<Portal>` component whose child content will be inserted at the location of your choosing. By default, its elements will be rendered in a `<div>` in the `document.body`.

In the example, we see our information popup get cut off. We can solve this by pulling it out of the flow by wrapping the element in a `<Portal>`:

```jsx
<Portal>
  <div class="popup">
    <h1>Popup</h1>
    <p>Some text you might need for something or other.</p>
  </div>
</Portal>
```
