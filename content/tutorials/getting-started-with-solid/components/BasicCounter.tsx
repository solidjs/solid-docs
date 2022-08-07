import { createSignal } from "solid-js";

export function BasicCounter() {
  const [count, setCount] = createSignal(0);

  const increment = () => {
    setCount(count() + 1);
  };

  return (
    <div>
      Current count: {count()}
      <button
        class="ml-2 p-1 border-2 bg-gray-200  px-2 rounded"
        onClick={increment}
      >
        Increment
      </button>
    </div>
  );
}
