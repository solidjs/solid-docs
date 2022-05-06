import { JSX, PropsWithChildren, Show, useContext } from "solid-js";
import { ConfigContext, OtherFramework } from "./ConfigContext";
import IconAccessibility from "~icons/icomoon-free/accessibility";
import IconReact from "~icons/mdi/react";
import IconVue from "~icons/mdi/vuejs";
import IconSvelte from "~icons/simple-icons/svelte";
import IconBulb from "~icons/mdi/lightbulb";
import "./Aside.css";

export const FrameworkAside = (
  props: PropsWithChildren<{ framework: OtherFramework }>
) => {
  const [config] = useContext(ConfigContext);

  return (
    <Aside
      type={props.framework}
      show={config().comingFrom === props.framework}
    >
      {props.children}
    </Aside>
  );
};

type AsideType =
  | "react"
  | "svelte"
  | "vue"
  | "accessibility"
  | "theory"
  | "advanced"
  | "general";

const logoProps = { "font-size": "1.6rem" };

const asideDefinition: () => Record<
  AsideType,
  { title: string | null; logo: JSX.Element }
> = () => ({
  react: {
    title: "Since you're coming from React",
    logo: <IconReact {...logoProps} />,
  },
  svelte: {
    title: "Since you're coming from Svelte",
    logo: <IconSvelte {...logoProps} />,
  },
  vue: {
    title: "Since you're coming from Vue",
    logo: <IconVue {...logoProps} />,
  },
  accessibility: {
    title: "Accessibility note",
    logo: <IconAccessibility {...logoProps} />,
  },
  theory: { title: "Some theory", logo: <></> },
  advanced: { title: "Advanced concepts", logo: <></> },
  general: { title: null, logo: <IconBulb {...logoProps} /> },
});

interface IAsideProps {
  show?: boolean;
  type: AsideType;
}

export const Aside = (props: PropsWithChildren<IAsideProps>) => {
  const definition = asideDefinition()[props.type];
  const title = () => definition.title;
  const logo = () => definition.logo;

  return (
    <div
      style={{
        display: props.show !== false ? "flex" : "none",
      }}
      class="aside p-5 rounded my-10 text-white bg-solid-medium dark:bg-darkdefault gap-2"
    >
      <div class="my-3">{logo()}</div>
      <div>
        <Show when={!!title()}>
          <h3 class="text-xl mt-3">{title()}</h3>
        </Show>
        {props.children}
      </div>
    </div>
  );
};
