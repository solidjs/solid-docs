import { createSignal, For, JSX, onMount, useContext } from "solid-js";
import { Config, ConfigContext } from "./ConfigContext";

type File = {
  name: string;
  component: () => JSX.Element;
  default?: boolean;
};

interface ICodeTabsProps {
  files: Record<Config["codeFormat"], File[]>;
}

/*
  This component should be refactored to use the Dynamic and Show components
  Once the hydration issues with those components are resolved. Right now,
  this component eager-loads everything and simply hides the non-selected 
  content using the CSS display property.
*/

export const CodeTabs = (props: ICodeTabsProps) => {
  const [selected, setSelected] = createSignal(0);
  const [config, setConfig] = useContext(ConfigContext);

  const jsxTabs = () => props.files.jsx;
  const tsxTabs = () => props.files.tsx;

  // Initial selected tab
  onMount(() => {
    const initialSelected = props.files[config().codeFormat].findIndex(
      (el) => el.default
    );
    if (initialSelected !== -1) setSelected(initialSelected);
  });

  return (
    <div class="my-10">
      <nav aria-label="Code example files" class="flex justify-between">
        <div
          style={{ display: config().codeFormat === "jsx" ? "block" : "none" }}
        >
          <For each={jsxTabs()}>
            {(file, i) => (
              <button
                classList={{
                  "border-b-2 border-blue-400": i() === selected(),
                  "p-2": true,
                }}
                onClick={() => setSelected(i())}
              >
                {file.name}
              </button>
            )}
          </For>
        </div>

        <div
          style={{ display: config().codeFormat === "tsx" ? "block" : "none" }}
        >
          <For each={tsxTabs()}>
            {(file, i) => (
              <button
                classList={{
                  "border-b-2 border-blue-400": i() === selected(),
                  "p-2": true,
                }}
                onClick={() => setSelected(i())}
              >
                {file.name}
              </button>
            )}
          </For>
        </div>

        <div class="flex gap-1">
          <button
            class={`py-2 px-3 rounded ${
              config().codeFormat === "jsx" ? "bg-yellow-300 text-black" : ""
            }`}
            onClick={() => setConfig((c) => ({ ...c, codeFormat: "jsx" }))}
          >
            JS
          </button>
          <button
            class={`py-2 px-3 rounded ${
              config().codeFormat === "tsx" ? "bg-blue-500" : ""
            }`}
            onClick={() => setConfig((c) => ({ ...c, codeFormat: "tsx" }))}
          >
            TS
          </button>
        </div>
      </nav>
      <div class="-mt-4">
        <div
          style={{ display: config().codeFormat === "jsx" ? "block" : "none" }}
        >
          <For each={jsxTabs()}>
            {(file, i) => (
              <div style={{ display: selected() === i() ? "block" : "none" }}>
                {file.component()}
              </div>
            )}
          </For>
        </div>

        <div
          style={{ display: config().codeFormat === "tsx" ? "block" : "none" }}
        >
          <For each={tsxTabs()}>
            {(file, i) => (
              <div style={{ display: selected() === i() ? "block" : "none" }}>
                {file.component()}
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
