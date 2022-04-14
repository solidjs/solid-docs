import { createSignal } from "solid-js";

export function BasicCounter() {
  const [count, setCount] = createSignal(0);

  const increment = () => {
    setCount(count() + 1);
  };

  return (
    <div>
      Current count: {count()}
      <button onClick={increment}>Increment</button>
    </div>
  );
}
