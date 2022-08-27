import { createResource, createSignal, For, Setter, Show } from "solid-js";
import Button from "~/components/Button";
import InteractiveExample from "~/components/configurable/interactiveExample";
import Dot from "~/components/Dot";
import SearchInput from "~/components/SearchInput";

type Book = {
  title: string;
  author: string;
};

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
    <InteractiveExample>
      <div class="bg-solid-darkbg border dark:border-solid-darkitem rounded-lg">
        <div class="p-4">
          <h2 class="text-2xl font-semibold mb-4">{props.name}'s Bookshelf</h2>
          <BookList books={books()} />
        </div>
        <div class="border-t dark:border-solid-darkitem p-4">
          <Show
            when={showForm()}
            fallback={
              <Button
                type="button"
                onClick={toggleForm}
              >
                Add a book
              </Button>
            }
          >
            <AddBook setBooks={setBooks} />
            <Button
              type="button"
              onClick={toggleForm}
            >
              Finished adding books
            </Button>
          </Show>
        </div>
      </div>
    </InteractiveExample>
  );
}

interface IBookListProps {
  books: Book[];
}

export function BookList(props: IBookListProps) {
  const totalBooks = () => props.books.length;

  return (
    <>
      <p class="font-semibold flex items-center gap-2">My books <Dot number={totalBooks()}/></p>
      <ul class="list-disc ml-4 mt-2">
        <For each={props.books}>
          {(book) => {
            return (
              <li>
                {book.title}{" "}
                <span class="italic text-neutral-400">({book.author})</span>
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
        <SearchInput label="search books" id="title" input={input()} onInput={(e) => {
          setInput(e.currentTarget.value);
        }}/>
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
