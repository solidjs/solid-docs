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
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);

  const toggleForm = () => setShowForm(!showForm());

  return (
    <InteractiveExample>
      <h1 class="text-2xl mb-3">{props.name}'s Bookshelf</h1>
      <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={
          <button
            class="px-3 py-2 rounded bg-blue-200 text-black"
            onClick={toggleForm}
          >
            Add a book
          </button>
        }
      >
        <AddBook setBooks={setBooks} />
        <button
          class="px-3 py-2 rounded bg-blue-200 text-black mt-4"
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
  const [newBook, setNewBook] = createSignal(emptyBook);

  const addBook: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    event.preventDefault();
    props.setBooks((books) => [...books, newBook()]);
    setNewBook(emptyBook);
  };

  return (
    <form>
      <div>
        <label for="title">Book name</label>
        <input
          id="title"
          class="ml-2 p-1 text-black border-1 border-black"
          value={newBook().title}
          onInput={(e) => {
            setNewBook({ ...newBook(), title: e.currentTarget.value });
          }}
        />
      </div>
      <div class="my-2">
        <label for="author">Author</label>
        <input
          id="author"
          class="ml-2 p-1 text-black border-1 border-black"
          value={newBook().author}
          onInput={(e) => {
            setNewBook({ ...newBook(), author: e.currentTarget.value });
          }}
        />
      </div>
      <button
        class="border-2 border-black px-2 py-1 rounded bg-blue-200"
        type="submit"
        onClick={addBook}
      >
        Add book
      </button>
    </form>
  );
}
