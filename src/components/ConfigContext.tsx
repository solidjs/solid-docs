import {
  createContext,
  createEffect,
  createSignal,
  PropsWithChildren,
  Signal,
} from "solid-js";

export type CodeFormat = "jsx" | "tsx";
export type OtherFramework = "react" | "vue" | "svelte";
export type ComingFrom = OtherFramework | "none";

export type Config = { codeFormat: CodeFormat; comingFrom: ComingFrom };

export const ConfigContext = createContext<Signal<Config>>();

export const defaultConfig: Config = {
  codeFormat: "jsx",
  comingFrom: "none",
};

// Cookie max-age = one year since this is not sensitive info
const MAX_AGE = 60 * 60 * 24 * 365;

export const ConfigProvider = (
  props: PropsWithChildren<{ initialConfig: Config }>
) => {
  const [config, setConfig] = createSignal(props.initialConfig);

  createEffect(() => {
    const serialized = JSON.stringify(config());
    document.cookie = `docs_config=${serialized}; SameSite=Lax; Secure; max-age=${MAX_AGE}`;
  });

  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      {props.children}
    </ConfigContext.Provider>
  );
};
