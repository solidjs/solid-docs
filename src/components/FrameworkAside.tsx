import { PropsWithChildren, useContext } from "solid-js";
import { ComingFrom, ConfigContext } from "./ConfigContext";

const frameworkName: Record<ComingFrom, string> = {
  react: "React",
  svelte: "Svelte",
  vue: "Vue",
  none: "None",
};

export const FrameworkAside = (
  props: PropsWithChildren<{ framework: ComingFrom }>
) => {
  const [config] = useContext(ConfigContext);

  const title = () => {
    if (props.framework === "none") {
      return "Since you're not coming from another framework";
    }
    return `Since you're coming from ${frameworkName[props.framework]}`;
  };

  return (
    <div
      style={{
        display: config().comingFrom === props.framework ? "block" : "none",
      }}
      class="border-1 p-2 rounded my-10"
    >
      <h3 class="text-xl">{title()}</h3>
      {props.children}
    </div>
  );
};
