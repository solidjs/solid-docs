import { createSignal, For, JSX, Setter, Show } from "solid-js";

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
    <div class="my-5 p-5 border-2">
      <h1 class="text-2xl mb-3">{props.name}'s Bookshelf</h1>
      <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={
          <button class="bg-gray-200 text-black px-2" onClick={toggleForm}>
            Add a book
          </button>
        }
      >
        <AddBook setBooks={setBooks} />
        <button class="bg-gray-200 text-black px-2 mt-3" onClick={toggleForm}>
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
          class="ml-2 text-black"
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
          class="ml-2 text-black"
          value={newBook().author}
          onInput={(e) => {
            setNewBook({ ...newBook(), author: e.currentTarget.value });
          }}
        />
      </div>
      <button
        class="px-2 bg-gray-200 text-black"
        type="submit"
        onClick={addBook}
      >
        Add book
      </button>
    </form>
  );
}
