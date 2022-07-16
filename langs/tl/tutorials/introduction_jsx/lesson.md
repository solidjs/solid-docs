JSX is the HTML-like syntax we've seen inside these examples and is core to building components in Solid. 
JSX adds dynamic expressions that allow you to reference variables and functions within your HTML by using the `{ } ` syntax.
In this example, we include the string `name` in our HTML using `{name}` inside a div. In the same way, we include an HTML element that was directly assigned to the `svg` variable.

Unlike some other frameworks that use JSX, Solid attempts to stay as close to HTML standards as possible, allowing simple copy and paste from answers on Stack Overflow or from template builders from your designers.

There are 3 main differences between JSX and HTML that prevent JSX from being seen as a superset of HTML:
1. JSX does not have void elements. This means that all elements must have a closing tag or self-close. Keep this in mind when copying over elements like `<input>` or `<br>`.
2. JSX must return a single Element. To represent multiple top level elements, use a Fragment element:

   ```jsx
   <>
     <h1>Title</h1>
     <p>Some Text</p>
   </>
   ```
3. JSX doesn't support HTML Comments `<!--...-->` or special tags like `<!DOCTYPE>`.

But JSX does support SVG. Let's try copying some SVG right into our component:
```jsx
<svg height="300" width="400">
  <defs>
    <linearGradient id="gr1" x1="0%" y1="60%" x2="100%" y2="0%">
      <stop offset="5%" style="stop-color:rgb(255,255,3);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="125" cy="150" rx="100" ry="60" fill="url(#gr1)" />
  Sorry but this browser does not support inline SVG.
</svg>
```
