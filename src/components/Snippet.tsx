import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  PropsWithChildren,
  Show,
  useContext,
} from "solid-js";
import { isServer } from "solid-js/web";

type Mode = "jsx" | "tsx" | undefined;

const DisplayModeContext = createContext<Accessor<Mode>>(() => "jsx");

const getDisplayMode: () => Mode = () => {
  return !isServer && localStorage.getItem("mode") === "tsx" ? "tsx" : "jsx";
};

const Container = (props: PropsWithChildren) => {
  const [displayMode, setDisplayMode] = createSignal<Mode>(getDisplayMode());

  createEffect(() => {
    !isServer && localStorage.setItem("mode", displayMode());
  });

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
      <DisplayModeContext.Provider value={displayMode}>
        {props.children}
      </DisplayModeContext.Provider>
    </>
  );
};

const Code = (props: PropsWithChildren<{ language: Mode }>) => {
  const displayMode = useContext(DisplayModeContext);
  return <Show when={displayMode() === props.language}>{props.children}</Show>;
};

export default { Container, Code };
