import {
  createContext,
  createEffect,
  ParentProps,
  useContext,
} from "solid-js";
import { createStore, SetStoreFunction} from "solid-js/store";

export type OtherFramework = "react" | "vue" | "svelte" | "angular";

export type ComingFrom = OtherFramework | "none";

type ColorMode = "dark" | "light" | "none";

export type Config = {
  typescript: boolean;
  comingFrom: ComingFrom;
  mode: ColorMode;
};

export const ConfigContext = createContext<[
  config: Config,
  setConfig: SetStoreFunction<Config>,
]>();

export const defaultConfig: Config = {
  typescript: false,
  comingFrom: "none",
  mode: "none",
};

// Cookie max-age = one year since this is not sensitive info
const MAX_AGE = 60 * 60 * 24 * 365;

export const ConfigProvider = (
  props: ParentProps<{ initialConfig: Config }>
) => {
  const [config, setConfig] = createStore(props.initialConfig);

  createEffect(() => {
    // Save to cookie
    const serialized = JSON.stringify(config);
    document.cookie = `docs_config=${serialized}; SameSite=Lax; Secure; max-age=${MAX_AGE}; path=/`;
    // Toggle mode
    if (config.mode !== "none") {
      document.documentElement.classList.remove(
        config.mode === "light" ? "dark" : "light"
      );
      document.documentElement.classList.add(config.mode);
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

export const useConfig = () => useContext(ConfigContext);
