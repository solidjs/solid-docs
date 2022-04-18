import { createEffect, createSignal, PropsWithChildren, Show } from "solid-js";

type Mode = "jsx" | "tsx";

const mode: Mode =
  typeof window !== "undefined" && localStorage.getItem("mode") === "tsx"
    ? "tsx"
    : "jsx";

const [displayMode, setDisplayMode] = createSignal<Mode>(mode);

createEffect(() => {
  typeof window !== "undefined" && localStorage.setItem("mode", displayMode());
});

const Container = (props: PropsWithChildren) => {
  return (
    <>
      <div class="flex justify-end gap-x-2">
        <button
          class={
            displayMode() === "jsx"
              ? "border-bottom-2 border-yellow-400"
              : "ease-in duration-300 border-bottom-2 border-transparent hover:border-yellow-300"
          }
          onClick={() => {
            setDisplayMode("jsx");
          }}
        >
          JavaScript
        </button>
        <button
          class={
            displayMode() === "tsx"
              ? "border-bottom-2 border-blue-500"
              : "ease-in duration-300 border-bottom-2 border-transparent hover:border-blue-500"
          }
          onClick={() => {
            setDisplayMode("tsx");
          }}
        >
          Typescript
        </button>
      </div>
      {props.children}
    </>
  );
};

const Code = (props: PropsWithChildren<{ language: Mode }>) => (
  <Show when={displayMode() === props.language}>{props.children}</Show>
);

export default { Container, Code };
