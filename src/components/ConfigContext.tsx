import {
  createContext,
  createEffect,
  createSignal,
  PropsWithChildren,
  Signal,
} from "solid-js";

export type CodeFormat = "jsx" | "tsx";
export type OtherFramework = "react" | "vue" | "svelte" | "angular";
export type ComingFrom = OtherFramework | "none";
type ColorMode = "dark" | "light" | "none";

export type Config = {
  codeFormat: CodeFormat;
  comingFrom: ComingFrom;
  mode: ColorMode;
};

export const ConfigContext = createContext<Signal<Config>>();

export const defaultConfig: Config = {
  codeFormat: "jsx",
  comingFrom: "none",
  mode: "none",
};

// Cookie max-age = one year since this is not sensitive info
const MAX_AGE = 60 * 60 * 24 * 365;

export const ConfigProvider = (
  props: PropsWithChildren<{ initialConfig: Config }>
) => {
  const [config, setConfig] = createSignal(props.initialConfig);

  createEffect(() => {
    // Save to cookie
    const serialized = JSON.stringify(config());
    document.cookie = `docs_config=${serialized}; SameSite=Lax; Secure; max-age=${MAX_AGE}; path=/`;
    // Toggle mode
    if (config().mode !== "none") {
      document.documentElement.classList.remove(
        config().mode === "light" ? "dark" : "light"
      );
      document.documentElement.classList.add(config().mode);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      {props.children}
    </ConfigContext.Provider>
  );
};
