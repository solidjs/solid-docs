import { createSignal, For, JSX, Setter, Show } from "solid-js";
import InteractiveExample from "~/components/configurable/interactiveExample";

type Book = {
  title: string;
  author: string;
};

const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
];

interface IBookshelfProps {
  name: string;
}

export function BasicBookshelfShow(props: IBookshelfProps) {
  const [getBooks, setBooks] = createSignal(initialBooks);
  const [getShowForm, setShowForm] = createSignal(false);

  const toggleForm = () => setShowForm(!getShowForm());

  return (
    <InteractiveExample>
      <h2 class="text-2xl mb-3">{props.name}'s Bookshelf</h2>
      <BookList books={getBooks()} />
      <Show
        when={getShowForm()}
        fallback={
          <button
            class="px-3 py-2 rounded bg-solid-accent hover:bg-solid-accent/90 text-white"
            onClick={toggleForm}
          >
            Add a book
          </button>
        }
      >
        <AddBook setBooks={setBooks} />
        <button
          class="px-3 py-2 rounded bg-solid-accent hover:bg-solid-accent/90 text-white mt-4"
          onClick={toggleForm}
        >
          Finished adding books
        </button>
      </Show>
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

const emptyBook: Book = { title: "", author: "" };

function AddBook(props: IAddBookProps) {
  const [getNewBook, setNewBook] = createSignal(emptyBook);

  const addBook: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    event.preventDefault();
    props.setBooks((books) => [...books, getNewBook()]);
    setNewBook(emptyBook);
  };

  return (
    <form>
      <div>
        <label for="title">Book name</label>
        <input
          id="title"
          class="ml-2 p-1 text-black border-1 border-black"
          value={getNewBook().title}
          onInput={(e) => {
            setNewBook({ ...getNewBook(), title: e.currentTarget.value });
          }}
        />
      </div>
      <div class="my-2">
        <label for="author">Author</label>
        <input
          id="author"
          class="ml-2 p-1 text-black border-1 border-black"
          value={getNewBook().author}
          onInput={(e) => {
            setNewBook({ ...getNewBook(), author: e.currentTarget.value });
          }}
        />
      </div>
      <button
        class="px-2 py-1 rounded bg-solid-accent hover:bg-solid-accent/90"
        type="submit"
        onClick={addBook}
      >
        Add book
      </button>
    </form>
  );
}
