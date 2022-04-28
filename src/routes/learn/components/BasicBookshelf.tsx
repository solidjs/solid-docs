import { createSignal, For, JSX, Setter } from "solid-js";

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

export function BasicBookshelf(props: IBookshelfProps) {
  const [books, setBooks] = createSignal(initialBooks);

  return (
    <div class="my-5 p-5 border-2">
      <h1 class="text-xl mb-3">{props.name}'s Bookshelf</h1>
      <BookList books={books()} />
      <AddBook setBooks={setBooks} />
    </div>
  );
}

interface IBookListProps {
  books: Book[];
}

export function BookList(props: IBookListProps) {
  return (
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
