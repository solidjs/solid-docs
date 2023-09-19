import { createSignal, For, JSX, Setter } from "solid-js";
import InteractiveExample from "~/components/configurable/interactiveExample";
import Dot from "~/components/Dot";

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

export function BasicBookshelf(props: IBookshelfProps) {
  const [getBooks, setBooks] = createSignal(initialBooks);

  return (
    <InteractiveExample>
      <div class="dark:bg-solid-darkbg border dark:border-solid-darkitem rounded-lg">
        <div class="p-4">
          <h2 class="text-2xl font-semibold mb-4">{props.name}'s Bookshelf</h2>
          <BookList books={getBooks()} />
        </div>
        <div class="border-t dark:border-solid-darkitem p-4">
          <AddBook setBooks={setBooks} />
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
      <p class="font-semibold flex items-center gap-2">
        My books <Dot number={totalBooks()} />
      </p>
      <ul class="list-disc pl-4 mt-2">
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
        class="border-2 border-black px-2 py-1  rounded bg-blue-200"
        type="submit"
        onClick={addBook}
      >
        Add book
      </button>
    </form>
  );
}
