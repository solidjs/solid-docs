import { createResource, createSignal, For, Setter, Show } from "solid-js";

interface Book {
  title: string;
  author: string;
}

const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

interface IBookshelfProps {
  name: string;
}

export function FinishedBookshelf(props: IBookshelfProps) {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);

  const toggleForm = () => setShowForm(!showForm());

  return (
    <div class="my-5 p-5 border-2">
      <h1 class="text-2xl mb-3">{props.name}'s Bookshelf</h1>
      <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={
          <button
            class="border-2 border-black px-2 py-1 rounded bg-blue-200"
            onClick={toggleForm}
          >
            Add a book
          </button>
        }
      >
        <AddBook setBooks={setBooks} />
        <button
          class="border-2 border-black px-2 py-1 rounded bg-blue-200 mt-4"
          onClick={toggleForm}
        >
          Finished adding books
        </button>
      </Show>
    </div>
  );
}

interface IBookListProps {
  books: Book[];
}

export function BookList(props: IBookListProps) {
  const totalBooks = () => props.books.length;

  return (
    <>
      <h2 class="text-xl">My books ({totalBooks()})</h2>
      <ul class="list-disc ml-5 mb-5">
        <For each={props.books}>
          {(book) => {
            return (
              <li>
                {book.title}{" "}
                <span style={{ "font-style": "italic" }}>({book.author})</span>
              </li>
            );
          }}
        </For>
      </ul>
    </>
  );
}

interface IAddBookProps {
  setBooks: Setter<Book[]>;
}

async function searchBooks(query: string) {
  if (query.trim() === "") return [];
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURI(query)}`
  );
  const results = await response.json();
  return results.docs.slice(0, 10).map(({ title, author_name }) => ({
    title,
    author: author_name?.join(", "),
  }));
}

function AddBook(props: IAddBookProps) {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");

  const [data] = createResource<Book[], string>(query, searchBooks);

  return (
    <>
      <form>
        <div>
          <label for="title">Search books</label>
          <input
            class="ml-2 p-1 text-black border-1 border-black"
            id="title"
            value={input()}
            onInput={(e) => {
              setInput(e.currentTarget.value);
            }}
          />
        </div>
        <button
          class="px-3 py-2 rounded bg-blue-200 text-black"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setQuery(input());
          }}
        >
          Search
        </button>
      </form>
      <Show when={!data.loading} fallback={<>Searching...</>}>
        <ul class="list-disc ml-5 my-4">
          <For each={data()}>
            {(book) => (
              <li class="mb-1">
                {book.title} by {book.author}{" "}
                <button
                  class="p-1 pb-0 text-black border-1 rounded-md border-black dark:text-white dark:border-white"
                  aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                  onClick={() => {
                    props.setBooks((books) => [...books, book]);
                  }}
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}
