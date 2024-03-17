The `style` attribute in Solid accepts either style strings or objects. However the object form differs from `Element.prototype.style` and instead is a wrapper for calling `style.setProperty`. This means that keys take the dash-case form, like "background-color" rather than "backgroundColor". This means that we have the ability to set CSS variables:

```js
<div style={{ "--my-custom-color": themeColor() }} />
```

Let's animate our div with a few inline styles:
```jsx
<div style={{
  color: `rgb(${num()}, 180, ${num()})`,
  "font-weight": 800,
  "font-size": `${num()}px`}}
>
  Some Text
</div>
```