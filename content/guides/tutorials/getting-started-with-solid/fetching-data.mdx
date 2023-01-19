import { PrevSection } from "~/components/NextSection";
import { Aside } from "~/components/configurable/Aside";
import { CodeTabs } from "~/components/Tabs";
import { FinishedBookshelf } from "./components/FinishedBookshelf";
import App5js from "./snippets/bookshelf/App5js.mdx";
import AddBook3js from "./snippets/bookshelf/AddBook3js.mdx";
import AddBook4js from "./snippets/bookshelf/AddBook4js.mdx";
import AddBook5js from "./snippets/bookshelf/AddBook5js.mdx";
import BookList5js from "./snippets/bookshelf/BookList5js.mdx";
import SearchBooksjs from "./snippets/bookshelf/SearchBooksjs.mdx";
import App5ts from "./snippets/bookshelf/App5ts.mdx";
import AddBook3ts from "./snippets/bookshelf/AddBook3ts.mdx";
import AddBook4ts from "./snippets/bookshelf/AddBook4ts.mdx";
import BookList5ts from "./snippets/bookshelf/BookList5ts.mdx";
import SearchBooksts from "./snippets/bookshelf/SearchBooksts.mdx";
import AddBook5ts from "./snippets/bookshelf/AddBook5ts.mdx";

<title>Fetching Data</title>

# Fetching Data

Our Bookshelf application is almost complete, but we live in a dynamic world.
Our applications are hardly ever self-contained. 
This is why Solid includes the concept of _resources_ out of the box. 
Resources are special signals designed specifically to handle asynchronous loading and are created using the `createResource` function.

Resources can be triggered by signals themselves. You'll usually pass `createResource` two parameters: a signal and a data fetching function that relies on that signal:

```tsx
const [data] = createResource(signal, dataFetchingFunction);
```

The signal _triggers_ the dataFetchingFunction: whenever it becomes a value other than `null`, `undefined`, or `false`, the `dataFetchingFunction` will be called, with that value as the first argument.

When our `dataFetchingFunction` completes, it will update the value of `data()`, which we can access like a normal signal. Additionally, `data.loading` and `data.error` properties will be available to us so we can react to the state of the data fetching.

Later, if the value of `signal` changes again, `dataFetchingFunction` will rerun again (as long as that value isn't `null`, `undefined`, or `false`).

<Aside type="advanced" collapsible title="The full createResource API">

TODO: Link to a createResource concept page!

</Aside>
## Fetching data for the bookshelf

In our Bookshelf application, we're not going to force our users to type the full book name and author of each book: we'll use an API to look up books.

Fortunately, [OpenLibrary.org](https://openlibrary.org/) provides an API that we can use to look up books by their titles. 
For example, `https://openlibrary.org/search.json?q=Lord%20of%20the%20Rings` will perform a search for the book "Lord of the Rings" and we will be able to get the book's official title and author.

Let's first write a data fetching function called `searchBooks` based on this API. The function will take a search term and return an array of matches from the OpenLibrary.org API:

<CodeTabs
  js={[
    { name: "App.jsx", component: App5js },
    { name: "AddBook.jsx", component: AddBook3js },
    { name: "BookList.jsx", component: BookList5js },
    { name: "searchBooks.js*", component: SearchBooksjs, default: true },
  ]}
  ts={[
    { name: "App.tsx", component: App5ts },
    { name: "AddBook.tsx", component: AddBook3ts },
    { name: "BookList.tsx", component: BookList5ts },
    { name: "searchBooks.ts*", component: SearchBooksts, default: true },
  ]}
/>

This code fetches data from the OpenLibrary.org API, selects the first 10 results, and then transforms the results a bit to only return `title` and `author` properties for each result.

Let's set this data-fetching function aside for a moment so we can refactor our `AddBooks.tsx` component. It currently consists of a form that lets users enter _both_ the title and author of a book they want to add to their bookshelf.

Now that we know we'll be using the OpenLibrary.org API, we can simplify this form a bit: we're just going to ask users to search for a book by its title. The text the user is typing will be set in the `input` signal. Once the user hits the `Search` button, the current value of the `input` signal will be stored in the `query` signal. This will be the source signal for our resource.

<CodeTabs
  js={[
    { name: "App.jsx", component: App5js },
    { name: "AddBook.jsx*", component: AddBook4js, default: true },
    { name: "BookList.jsx", component: BookList5js },
    { name: "searchBooks.js", component: SearchBooksjs },
  ]}
  ts={[
    { name: "App.tsx", component: App5ts },
    { name: "AddBook.tsx*", component: AddBook4ts, default: true },
    { name: "BookList.tsx", component: BookList5ts },
    { name: "searchBooks.ts", component: SearchBooksts },
  ]}
/>

Now that we have our source signal, `query`, and our data-fetching function, `searchBooks`, we can use `createResource` to query the OpenLibrary.org API! As a reminder, `createResource` will take the source signal and data-fetcher function as arguments:

```tsx
const [data] = createResource(query, searchBooks);
```

Knowing that we'll have access to `data.loading` when we're in a loading state, we can display "Searching..." when data is loading or a list of results when data is loaded. Let's use the `<Show />` and `<For />` control flow features we've learned.

```tsx
const [data] = createResource(query, searchBooks);

<Show when={!data.loading} fallback={<>Searching...</>}>
  <ul>
    <For each={data()}>
      {(book) => (
        <li>
          {book.title} by {book.author} <button>Add</button>
        </li>
      )}
    </For>
  </ul>
</Show>;
```

Finally, we'll want to make sure the `<button />` in each list item adds the item to our book list.

```tsx
const [data] = createResource(query, searchBooks);

<Show when={!data.loading} fallback={<>Searching...</>}>
  <ul>
    <For each={data()}>
      {(book) => (
        <li>
          {book.title} by {book.author}{" "}
          <button
            aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
            onClick={(e) => {
              e.preventDefault();
              props.setBooks((books) => [...books, book]);
            }}
          >
            Add
          </button>
        </li>
      )}
    </For>
  </ul>
</Show>;
```

<Aside type="accessibility">

We can include an `aria-label` on our Add button to make the action taken by the button clear to screen readers. Solid will never get in the way of writing accessible code, but it also doesn't write it for you!

</Aside>

## Finishing the app

Let's plug this resource fetching and display code into our `AddBook` file, which will complete the application:

<CodeTabs
  js={[
    { name: "App.jsx", component: App5js },
    { name: "AddBook.jsx*", component: AddBook5js, default: true },
    { name: "BookList.jsx", component: BookList5js },
    { name: "searchBooks.js", component: SearchBooksjs },
  ]}
  ts={[
    { name: "App.tsx", component: App5ts },
    { name: "AddBook.tsx*", component: AddBook5ts, default: true },
    { name: "BookList.tsx", component: BookList5ts },
    { name: "searchBooks.ts", component: SearchBooksts },
  ]}
/>

<FinishedBookshelf name="Solid" />

## Congratulations!

You just built your first Solid app! You now know how to build user interfaces, manage state, conditionally display information, and dynamically fetch content using Solid.