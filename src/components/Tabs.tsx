import { createSignal, For, JSX, useContext } from "solid-js";
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
  const [selected, setSelected] = createSignal<string>();
  const [config, setConfig] = useContext(ConfigContext);

  const availableTabs = () => props.files[config().codeFormat];

  const selectedTab = () => {
    const customSelected = availableTabs().find(
      (file) => file.name === selected()
    );
    if (customSelected) {
      return customSelected;
    }
    const defaultSelected = availableTabs().find((file) => file.default);
    if (defaultSelected) {
      return defaultSelected;
    }
    return availableTabs()[0];
  };

  return (
    <div class="my-10">
      <nav aria-label="Code example files" class="flex justify-between">
        <div>
          <For each={availableTabs()}>
            {(file) => (
              <button
                classList={{
                  "border-b-2 border-blue-400":
                    selectedTab().name === file.name,
                  "p-2": true,
                }}
                onClick={() => setSelected(file.name)}
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
        <Dynamic component={selectedTab().component} />
      </div>
    </div>
  );
};
