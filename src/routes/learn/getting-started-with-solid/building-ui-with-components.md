<title>Building UI</title>

Note: consider starting a simple example here that can be carried through the Getting Started with Solid sections.

## What are components?

- Small, reusable, easily-tested pieces of code that represent part of your user interface
- Show example component
- Note the JSX, which we'll discuss next

## JSX

- HTML-like syntax. JSX represents part of the DOM
- JSX rules:
  - No void elements: elements must have a closing tag or self-close.
  - Must return a single element (show example of this)
  - JSX doesn't support HTML Comments `<!--...-->` or special tags like `<!DOCTYPE>`.
- Using variables in JSX

## Mounting Solid to the DOM

- We have built a UI, but we need to add it to our page
- Show `render()` snippet, explain that it mounts the JSX to the specified DOM node

## Composing multiple components together

- Using example, compose a simple UI
- Note how components are called as JSX in other components
