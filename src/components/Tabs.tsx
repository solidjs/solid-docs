import { createSignal, For, JSX, onMount, useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Config, useConfig } from "./context/ConfigContext";

type File = {
  name: string;
  component: () => JSX.Element;
  default?: boolean;
};


interface CodeTabsProps {
  ts: File[],
  js: File[]
}

export const CodeTabs = (props: CodeTabsProps) => {

  const [config, setConfig] = useConfig();

  const selectedTabSet = () => config.typescript ? props.ts : props.js;

  const initialSelectedIndex = selectedTabSet().findIndex(
    (el) => el.default
  );

  const [selectedIndex, setSelectedIndex] = createSignal(initialSelectedIndex === -1 ? 0 : initialSelectedIndex);
  
  const selectedFile = () => selectedTabSet()[selectedIndex()];

  return (
    <div class="my-10 w-full">
      <nav aria-label="Code example files" class="flex justify-between">
        <div>
          <For each={selectedTabSet()}>
            {(file, i) => (
              <button
                aria-label={`Display the ${file.name} code`}
                classList={{
                  "border-b-2 border-blue-400": i() === selectedIndex(),
                  "p-2": true,
                }}
                onClick={() => setSelectedIndex(i())}
              >
                {file.name}
              </button>
            )}
          </For>
        </div>
        <div class="flex gap-1">
          <For each={[false, true]}>
            {(toTypescript: boolean) => (
              <button
                aria-label={`Change code examples to ${
                  !toTypescript ? "JavaScript" : "TypeScript"
                }`}
                classList={{
                  "py-2 px-3 rounded": true,
                  "font-bold": true,
                  "btn-typescript":
                    config.typescript === toTypescript && toTypescript,
                  "btn-javascript":
                    config.typescript === toTypescript && !toTypescript,
                }}
                onClick={() => setConfig("typescript", toTypescript)}
              >
                {toTypescript ? "TS" : "JS"}
              </button>
            )}
          </For>
        </div>
      </nav>

      <div class="-mt-4" aria-live="polite">
        <Dynamic component={selectedFile().component} />
      </div>
    </div>
  );
};
