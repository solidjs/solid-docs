import { createSignal, For, Setter, JSX } from "solid-js";

interface IBooksProps {
  books: string[];
}

function Books(props: IBooksProps) {
  return (
    <ul>
      <For each={props.books}>
        {(book) => {
          return <li>{book}</li>;
        }}
      </For>
    </ul>
  );
}

interface IAddBookProps {
  setBooks: Setter<string[]>;
}

function AddBook(props: IAddBookProps) {
  const [newBook, setNewBook] = createSignal("");

  const addBook: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    event.preventDefault();
    props.setBooks((books) => {
      return [...books, newBook()];
    });
    setNewBook("");
  };

  return (
    <form>
      <label for="book-name">Book name</label>
      <input
        id="book-name"
        value={newBook()}
        onInput={(event) => {
          setNewBook(event.currentTarget.value);
        }}
      />
      <button type="submit" onClick={addBook}>
        Add book
      </button>
    </form>
  );
}

interface IBookshelfProps {
  name: string;
}

export function BasicBookshelf(props: IBookshelfProps) {
  const [books, setBooks] = createSignal([
    "Code Complete",
    "JavaScript: The Good Parts",
  ]);

  return (
    <div>
      <h1>{props.name}'s Bookshelf</h1>
      <Books books={books()} />
      <AddBook setBooks={setBooks} />
    </div>
  );
}
