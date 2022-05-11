import { createSignal, For, JSX, onMount, useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Config, ConfigContext } from "./ConfigContext";

type File = {
  name: string;
  component: () => JSX.Element;
  default?: boolean;
};

interface ICodeTabsProps {
  files: Record<Config["codeFormat"], File[]>;
}

export const CodeTabs = (props: ICodeTabsProps) => {
  const [selected, setSelected] = createSignal(0);
  const [config, setConfig] = useContext(ConfigContext);

  // Initial selected tab
  onMount(() => {
    const initialSelected = props.files[config().codeFormat].findIndex(
      (el) => el.default
    );
    if (initialSelected !== -1) setSelected(initialSelected);
  });

  const selectedTabSet = () => props.files[config().codeFormat];
  const selectedFile = () => selectedTabSet()[selected()];

  return (
    <div class="my-10">
      <nav aria-label="Code example files" class="flex justify-between">
        <div>
          <For each={selectedTabSet()}>
            {(file, i) => (
              <button
                aria-label={`Display the ${file.name} code`}
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
          <For each={["jsx", "tsx"]}>
            {(format: "jsx" | "tsx") => (
              <button
                aria-label={`Change code examples to ${
                  format === "jsx" ? "JavaScript" : "typescript"
                }`}
                classList={{
                  "py-2 px-3 rounded": true,
                  "font-bold": true,
                  "btn-typescript":
                    config().codeFormat === format && format === "tsx",
                  "btn-javascript":
                    config().codeFormat === format && format === "jsx",
                }}
                onClick={() => setConfig((c) => ({ ...c, codeFormat: format }))}
              >
                {format === "jsx" ? "JS" : "TS"}
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
