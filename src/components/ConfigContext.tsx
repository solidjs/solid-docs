import {
  createContext,
  createEffect,
  createSignal,
  PropsWithChildren,
  Signal,
} from "solid-js";
import { isServer } from "solid-js/web";

export type CodeFormat = "jsx" | "tsx";
export type ComingFrom = "react" | "vue" | "svelte" | "none";

export type Config = { codeFormat: CodeFormat; comingFrom: ComingFrom };

export const ConfigContext = createContext<Signal<Config>>();

const defaultConfig: Config = {
  codeFormat: "jsx",
  comingFrom: "none",
};

const getStoredOrDefault = (): Config => {
  if (isServer) {
    return defaultConfig;
  }

  const stored = localStorage.getItem("docs-config");

  return stored ? JSON.parse(stored) : defaultConfig;
};

export const ConfigProvider = (props: PropsWithChildren) => {
  const config = createSignal(getStoredOrDefault());

  createEffect(() => {
    if (!isServer)
      localStorage.setItem("docs-config", JSON.stringify(config[0]()));
  });

  return (
    <ConfigContext.Provider value={config}>
      {props.children}
    </ConfigContext.Provider>
  );
};
