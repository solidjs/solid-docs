import { createSignal } from "solid-js";
import Button from "~/components/Button";
import InteractiveExample from "~/components/configurable/interactiveExample";

export function BasicCounter() {
  const [getCount, setCount] = createSignal(0);

  const increment = () => {
    setCount(getCount() + 1);
  };

  return (
    <InteractiveExample>
      <div class="flex items-center gap-2">
        Current count: {getCount()}
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
