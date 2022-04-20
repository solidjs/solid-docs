import { PropsWithChildren, useContext } from "solid-js";
import { CodeFormat, ConfigContext } from "./ConfigContext";

const Container = (props: PropsWithChildren) => {
  const [config, setConfig] = useContext(ConfigContext);

  return (
    <>
      <div class="flex justify-end gap-x-2">
        <button
          class={
            config().codeFormat === "jsx"
              ? "border-bottom-2 border-yellow-400"
              : "ease-in duration-300 border-bottom-2 border-transparent hover:border-yellow-300"
          }
          onClick={() => {
            setConfig((c) => ({ ...c, codeFormat: "jsx" }));
          }}
        >
          JavaScript
        </button>
        <button
          class={
            config().codeFormat === "tsx"
              ? "border-bottom-2 border-blue-500"
              : "ease-in duration-300 border-bottom-2 border-transparent hover:border-blue-500"
          }
          onClick={() => {
            setConfig((c) => ({ ...c, codeFormat: "tsx" }));
          }}
        >
          Typescript
        </button>
      </div>
      {props.children}
    </>
  );
};

const Code = (props: PropsWithChildren<{ language: CodeFormat }>) => {
  const [config] = useContext(ConfigContext);
  return (
    <div
      style={{
        display: config().codeFormat === props.language ? "block" : "none",
      }}
    >
      {props.children}
    </div>
  );
};

export default { Container, Code };
