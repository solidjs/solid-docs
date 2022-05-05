<title>JavaScript for Solid</title>

Are you new to frontend frameworks or coming back to JavaScript after a few years? Here's a refresher on the most important JavaScript features and patterns you need to know. JavaScript is a flexible language and there are many approaches to writing it, so this isn't a conclusive manual for all JavaScript codebeases but a "best practices" guide for working with Solid.

## The Red Herrings of Good JavaScript

When first writing modern JavaScript you might be tempted to use one of these keywords:

```js
var, new, this, class
```

It's a good rule of thumb to avoid these. You can build any Solid app without them, they add unwarranted complexity to your code, and there are replacements for them that we'll talk about below. There are some occasional use cases for `this` that we'll introduce later on in the docs. And some very opinionated, advanced users build their systems with `class`, but they're not taking our advice.

## `let` and `const`

Previously, you might've used `var` in JavaScript for declaring a variable. In modern JavaScript, there are two keywords for declaring variables: `let` and `const`. `const` declares a variable that won't ever be set to anything else, and `let` declares a variable that _can_ be assigned to something else.

```js
let counter = 2;
counter++; //counter is now set to 3
const badCounter = 2;
badCounter++; //TypeError: Assignment to constant variable.

const person = { name: "Ryan" };
person.name = "Joe"; //This works; we haven't reassigned `person`, we simply mutated the object that was stored there.

const people = [person];
people.push({ name: "David" }); //This works; we haven't reassigned `person`, we simply added something to the array that was stored there.
```

When working with objects and arrays, it is far more common to use `const` than `let`, because usually you want to _mutate_ the object rather than _reassigning_ the variable.

By default, use `const`. Declare it with `let` only if you find that a variable does need to be reassigned later. This makes your intention clear for your readers.

## Vite and ES6 Imports

Before we had modern toolchains for web development, we would "import" multiple JavaScript files by including `script` tags in our HTML.

```html
<script src="utils.js"></script>
<script src="main.js"></script>
```

This was tricky because you had to make sure that a file executed only after all of its dependencies were loaded - the order of the script tags mattered, and you had to declare all of this in your HTML rather than in your JavaScript where the dependencies were used.

Developer tools like [Vite](https://vitejs.dev/) allow us to use a better approach to importing JavaScript. Vite is a development server and a bundling tool: it runs your code locally, providing features like automatic reloading that makes it easier to develop your project. When you're ready to deploy your site, it "builds" your code, optimizing it and splitting your JavaScript back into those many script tags.

When writing our Solid projects, we use the JavaScript-based [approach to imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) that was introduced in the ES6 version of the language. Definitely check out the full [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) if you haven't seen this before, but here's a quick example as a refresher:

```js
//utils.js
function areaOfCircle(radius) {
  return Math.PI * radius ** 2;
}

export { areaOfCircle };

//main.js
import { areaOfCircle } from "./utils.js";

console.log(areaOfCircle(4));
```

## Factory Functions and Closures

There are many ways of doing object-oriented programming in JavaScript, but the most common you'll find alongside Solid is the technique of defining a function that returns an object.

```js
function createCar(make: string, year: number) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  return {
    make,
    age,
  };
}

const myCar = createCar("Ford Fusion", 2018);
console.log(myCar.age);
```

Because functions in JavaScript can be passed around like any other value (i.e. JavaScript has _first-class functions_), the object created by the factory function can have its own functions:

```js
function createCar(make, year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  function drive() {
    console.log(make + " goes VROOM");
  }

  return {
    make,
    age,
    drive,
  };
}

const myCar = createCar("Ford Fusion", 2018);
myCar.drive(); //Ford Fusion goes VROOM
```

Note that the `drive` function uses the value of `make`, which was a parameter of the outer function. Later, when `myCar.drive()` is called, it "remembers" the value of `make`. This is called a _closure_ because a value outside of the function was "enclosed" with the function so that it can make use of it later on.

We can use these ideas to write factories that directly return functions:

```js
function multiplyBy(multiplier) {
  return function (number) {
    return multiplier * number;
  };
}

const double = multiplyBy(2);
console.log(double(7)); //14
```

## Destructuring

In JavaScript, it is common to pass objects around as arguments:

```js
function gameSetup(options) {
  initializeScreen(options.screenWidth, options.screenHeight);
  if (options.multiplayer) {
    startMultiplayerGame();
    return;
  }
  startGame();
}
```

If we know that these three properties (`screenWidth`, `screenHeight`, and `multiplayer`) are present on the object, we can "destructure" it and save ourselves from repeating the name of the object:

```js
function gameSetup(options, playersArray) {
  const { screenWidth, screenHeight, multiplayer } = options;
  initializeScreen(screenWidth, screenHeight);
  if (multiplayer) {
    console.log(
      "Starting a game with" + playersArray[0] + " and " + playersArray[1]
    );
    startTwoPlayerGame(playersArray[0], playersArray[1]);
    return;
  }
  startGame();
}
```

We can also destructure arrays:

```js
function gameSetup(options, playersArray) {
  const { screenWidth, screenHeight, multiplayer } = options;
  initializeScreen(screenWidth, screenHeight);
  if (multiplayer) {
    const [player1, player2] = playersArray;
    console.log("Starting a game with" + player1 + " and " +  player2)
    startTwoPlayerGame(player1, player2;
    return;
  }
  startGame();
}
```

Destructuring lets us do a [lot of tricks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), and you'll see it a lot in Solid.

## Template Literals

We can simplify the console output in the previous example using template literals:

```js
console.log(`Starting a game with ${player1} and ${player2}`);
```

Template literals also allow you to create multiline strings without having to manually insert a `\n` character:

```js
const multiline = `spans two
lines`;
console.log(multiline);
//spans two
//lines
```

Some tools in the Solid ecosystem make use of [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) which let you define a function that operates on a template literal and any included variables. This is used to easily bring special functionality to strings. For example, using Solid without JSX makes use of an `html` tagged template:

```js
import html from "https://cdn.skypack.dev/solid-js/html";

function App() {
  const [count, setCount] = ...
  ...
  return html`<div>${count}</div>`;
}

```

## Arrow Functions

There are many ways to declare a function in JavaScript. Here are most of them:

1. [Function declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#the_function_declaration_function_statement)

```js
function areaOfCircle(radius) {
  return radius * Math.PI ** 2;
}
```

2. [Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#defining_methods)

```js
const utils = {
  areaOfCircle(radius) {
    return radius * Math.PI ** 2;
  },
};
```

3. [Function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#the_function_expression_function_expression)

```js
const areaOfCircle = function (radius) {
  return radius * Math.PI ** 2;
};
```

4. [Arrow function]()

```js
const areaOfCircle = (radius) => {
  return radius * Math.PI ** 2;
};

//Or the shorthand if you only have one line of code in the function body:
const areaOfCircle = (radius) => radius * Math.PI ** 2;
```

There are nuanced differences between these declarations - for example, add `console.log(this);` inside of each - but most are irrelevant day-to-day working with Solid (if you're curious, check out this [detailed article](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/)).

If you're in doubt, use an arrow function (example #4). As long as you're following the earlier advice and not using the `this` keyword, there will be no difference between an arrow function and a function expression.

## Functions as Arguments

Earlier, we saw how you can return a function from a function. You can also accept a function as an argument to a function:

```js
function callForEach(array, func) {
  for (let i = 0; i < array.length; i++) {
    const currentElement = array[i];
    func(currentElement);
  }
}

const myArray = ["I", "love", "Solid"];
callForEach(myArray, console.log);
//I
//love
//Solid
```

Many functions that are built-in to JavaScript (and many that come with Solid) take a function argument. The above is actually built-in to JavaScript arrays:

```js
const myArray = ["I", "love", "Solid"];
myArray.forEach(console.log);
//I
//love
//Solid
```

Another common example is the built-in `map` method. It takes as its argument a function that maps the current element of the array to a new result:

```js
const myArray = ["I", "love", "Solid"];
const uppercase = myArray.map(element => element.toUpperCase())) // ["I", "LOVE", "SOLID"]
```

## Declarative vs Imperative Code

JavaScript array methods like `map` (and others like [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) and [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)) can replace loops that you might make with `for` or `while`. Those traditional loop techniques are called "imperative" - they state step-by-step how to accomplish something:

```js
const myNumbers = [1, 2, 3, 4, 5, 11, 18, 65];
let oddNumbers = [];
for (const number of myNumbers) {
  if (number % 2 !== 0) {
    oddNumbers.push(number);
  }
}
console.log(oddNumbers); // [ 1, 3, 5, 11, 65 ]
```

Using JavaScript array methods allow for more "declarative" code, where you state _what_ to do but not the full details of _how_.

```js
const myNumbers = [1, 2, 3, 4, 5, 11, 18, 65];
const oddNumbers = myNumbers.filter((number) => number % 2 !== 0);
console.log(oddNumbers); // [ 1, 3, 5, 11, 65 ]
```

Here, we accomplished the same thing in one line of code by using the `filter` array method, which takes a function and returns a new array that contains only the elements that return true when passed to the function.

When we say we write "declarative code", we mean that we make use of abstractions to write code that is more streamlined: focused more on _what_ we are trying to accomplish than exactly _how_. Using `filter` allows us to write less "boilerplate" looping code, and instead focus on the core functionality that we want. The code is simpler to read: `for` loops can be used for all sorts of purposes, but whenever you see `filter` you know that the purpose of the looping is to ignoring some items in an array.

HTML is a great example of a _declarative_ way of writing: you state _what_ you want the structure to be, not _how_ it should be put together or rendered. As we hope to show you in this tutorial, Solid makes it easier to write declarative code when working with UIs.
