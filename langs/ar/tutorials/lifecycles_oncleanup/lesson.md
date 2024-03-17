Some frameworks pair their cleanup methods as return values of their side effects or lifecycle methods. Since everything in a Solid render tree is living inside a (possibly inert) Effect and can be nested, we made `onCleanup` a first-class method. You can call it at any scope and it will run when that scope is triggered to re-evaluate and when it is finally disposed.

Use it in your components or in your Effects. Use it in your custom directives. Use it pretty much anywhere that is part of the synchronous execution of the reactive system.

The Signal example from the introduction never cleaned up after itself. Let's fix that by replacing the `setInterval` call with this:

```js
const timer = setInterval(() => setCount(count() + 1), 1000);
onCleanup(() => clearInterval(timer));
```