import { createSignal } from "solid-js";
import Button from "~/components/Button";
import InteractiveExample from "~/components/configurable/interactiveExample";

export function BasicCounter() {
  const [count, setCount] = createSignal(0);

  const increment = () => {
    setCount(count() + 1);
  };

  return (
    <InteractiveExample>
      <div class="flex items-center gap-2">
        Current count: {count()}
        <Button
          type="button"
          onClick={increment}
        >
          Increment
        </Button>
      </div>
    </InteractiveExample>
  );
}
