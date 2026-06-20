---
title: Props
category: Concepts / Components
use_cases: >-
  passing data between components, parent-child communication, component
  configuration, default values, prop management
tags:
  - props
  - components
  - data
  - communication
  - mergeprops
  - splitprops
version: "1.0"
description: >-
  Pass and manage component props in Solid while maintaining reactivity. Learn
  mergeProps, splitProps, and best practices.
---

Props are a way to pass state from a parent component to a child component.
These read-only properties are passed to components as attributes within JSX and are accessible within the component via the `props` object:

```tsx
function App() {
	// Passing a prop named "name" to the MyComponent component
	return (
		<div>
			<MyComponent name="Ryan Carniato" />
		</div>
	);
}
```

To access the props in the child component, you use the `props` object:

```tsx
function MyComponent(props) {
	return <div>Hello {props.name}</div>;
}
```

## `mergeProps`

[`mergeProps`](/reference/reactive-utilities/merge-props) is a Solid utility function designed to merge multiple potentially reactive objects together.
It behaves similar to [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) but will retain the reactivity of the properties being merged.
This helps ensure that when individual properties within the merged object change, their reactivity is not lost.

```typescript
import { mergeProps } from "solid-js";

function MyComponent(props) {
	// Using mergeProps to set default values for props
	const finalProps = mergeProps({ defaultName: "Ryan Carniato" }, props);

	return <div>Hello {finalProps.defaultName}</div>;
}

// Usage: <MyComponent defaultName="Ryan Carniato" />
```

When merging props, if there is no existing value for a property, the value from the first object will be used.
However, if a value already exists, it will be used instead, all while retaining the reactivity of the property.

## Destructuring props

Props are read-only so that child components do not directly modify the data passed by the parent.
This also encourages one-way data flow, a pattern often seen to promote more predictable data management.

With Solid, destructuring props is not recommended as it can break reactivity.
Instead, you should access props directly from the `props` object, or wrap them in a function to ensure they are always up-to-date:

```typescript
function MyComponent(props) {
	const { name } = props; // ❌: breaks reactivity and will not update when the prop value changes
	const name = props.name; // ❌: another example of breaking reactivity
	const name = () => props.name; // ✓: by wrapping `props.name` into a function, `name()` always retrieves its current value
}
```

### `splitProps`

[`splitProps`](/reference/reactive-utilities/split-props) is a utility function designed to help split a single props object into multiple sets of props, retaining the reactivity of the individual properties.
It provides a way to destructure props without breaking reactivity.

`splitProps` gives you the ability to define one or more arrays of keys that you wish to extract into separate props objects, all while retaining the reactivity of the individual properties.
It will return an array of props objects related to each set of keys, plus an additional props object containing any remaining keys.

When passing props to child components, you can use `splitProps` to split the props into multiple groups, and then pass each group to the appropriate child component:

```typescript
import { splitProps } from "solid-js";

function ParentComponent(props) {
	// Splitting props into two groups: 'name' and 'age'
	const [greetingProps, personalInfoProps, restProps] = splitProps(
		props,
		["name"],
		["age"]
	);

	// Using greetingProps and personalInfoProps in the current component
	return (
		<div>
			<Greeting {...greetingProps} />
			<PersonalInfo {...personalInfoProps} />
			{/* restProps can be passed down or used as needed */}
		</div>
	);
}
```

## Passing props to children

In most instances, simply using `props` within JSX will work without any issues.
However, there are some cases where accessing `props.children` multiple times can introduce problems and unexpected behaviours, such as repeated creation of child components or elements.
For instances like these, Solid provides a [`children`](/reference/component-apis/children) helper that ensures you always get the right child components without anything unwanted happening.

```typescript
import { children } from "solid-js";

function ColoredList(props) {
	const safeChildren = children(() => props.children);

	return <>{safeChildren()}</>;
}
```

## Prop drilling

Prop drilling refers to passing props through multiple layers of components.
While this is a valid pattern, it can cause props to become cluttered and confusing
in larger component trees, especially when intermediate components receive values they do not directly use.

When multiple components across different levels need access to the same data, Solid’s [Context](/concepts/context) API provides a cleaner alternative. [Context](/concepts/context) allows you to supply values to deeply nested components without manually threading props through each layer.
