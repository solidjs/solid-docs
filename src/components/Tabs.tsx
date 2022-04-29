import {
  Accessor,
  createContext,
  createSignal,
  For,
  JSX,
  PropsWithChildren,
  useContext,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { Config, ConfigContext } from "./ConfigContext";

const TabContext = createContext<Accessor<string>>();

export const Tabs = (
  props: PropsWithChildren<{ files: string[]; selected: string }>
) => {
  const [selected, setSelected] = createSignal<string>(props.selected);
  const [config, setConfig] = useContext(ConfigContext);

  return (
    <div class="my-10">
      <nav aria-label="Code example files" class="flex justify-between">
        <div>
          <For each={props.files}>
            {(file) => (
              <button
                classList={{
                  "border-b-2 border-blue-400": selected() === file,
                  "p-2": true,
                }}
                onClick={() => setSelected(file)}
              >
                {file}
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
      <TabContext.Provider value={selected}>
        <div class="-mt-4">{props.children}</div>
      </TabContext.Provider>
    </div>
  );
};

export const Tab = (props: PropsWithChildren<{ name: string }>) => {
  const selected = useContext(TabContext);
  return (
    <div style={{ display: selected() == props.name ? "block" : "none" }}>
      {props.children}
    </div>
  );
};

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
      <Dynamic component={selectedTab().component} />
    </div>
  );
};
