import { createSignal, JSX, ParentProps, Show } from "solid-js";
import { useConfig, OtherFramework } from "../context/ConfigContext";
import IconAccessibility from "~icons/icomoon-free/accessibility";
import IconReact from "~icons/mdi/react";
import IconVue from "~icons/mdi/vuejs";
import IconAngular from "~icons/mdi/angular";
import IconSvelte from "~icons/simple-icons/svelte";
import IconBulb from "~icons/mdi/lightbulb";
import IconBrain from "~icons/mdi/brain";
import IconAlertDecagram from "~icons/mdi/alert-decagram";
import "./Aside.css";
import { CollapsedIcon } from "../nav/NavSection";

export const FrameworkAside = (
  props: ParentProps<{ framework: OtherFramework }>
) => {
  const [config] = useConfig();

  return (
    <Aside type={props.framework} show={config.comingFrom === props.framework}>
      {props.children}
    </Aside>
  );
};

type AsideType =
  | "react"
  | "svelte"
  | "vue"
  | "angular"
  | "accessibility"
  | "theory"
  | "warning"
  | "advanced"
  | "general";

const logoProps = { "font-size": "1.2rem" };

const asideDefinition: () => Record<
  AsideType,
  {
    title: string | null;
    logo: JSX.Element;
    bgColor?: string;
    preferDarkText?: boolean;
  }
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
  angular: {
    title: "Since you're coming from Angular",
    logo: <IconAngular {...logoProps} />,
  },
  accessibility: {
    title: "Accessibility note",
    logo: <IconAccessibility {...logoProps} />,
  },
  theory: { title: "Some theory", logo: <></> },
  warning: {
    title: "Warning",
    logo: <IconAlertDecagram {...logoProps} />,
    bgColor: "#eab308",
    preferDarkText: true,
  },
  advanced: { title: "Advanced concepts", logo: <IconBrain {...logoProps} /> },
  general: { title: null, logo: <IconBulb {...logoProps} /> },
});

interface AsideProps {
  show?: boolean;
  type: AsideType;
  collapsible?: boolean;
  title?: string;
  bgColor?: string;
  preferDarkText?: boolean;
  class?: string;
}

export const Aside = (props: ParentProps<AsideProps>) => {
  const [showContent, setShowContent] = createSignal(!props.collapsible);
  const definition = asideDefinition()[props.type || "general"];
  const bgColor = () => props.bgColor || definition.bgColor || false;
  const preferDark = () =>
    props.preferDarkText || definition.preferDarkText || false;
  const title = () => props.title || definition.title;
  const logo = () => definition.logo;

  return (
    <div
      aria-live="polite"
      class={`${
        props.show === false ? "hidden" : ""
      } flex aside p-5 rounded mt-10 mb-14${
        preferDark() ? " text-black" : " text-white"
      }${bgColor() ? "" : " bg-solid-medium dark:bg-darkdefault"} gap-2 ${
        props.class ?? ""
      }`}
      style={`${bgColor() ? `background-color: ${bgColor()}` : ""}`}
    >
      <div class="my-3">{logo()}</div>
      <div>
        <Show when={!!title() && !props.collapsible}>
          <h3 class="text-xl mt-3">{title()}</h3>
        </Show>
        <Show when={!!title() && props.collapsible}>
          <h3 class="text-xl mt-3">
            <button
              aria-label={`Show expanded ${title()} content`}
              class="flex gap-3"
              onClick={() => setShowContent(!showContent())}
            >
              {title()}
              <CollapsedIcon
                class={`flex-0 transform ${
                  showContent() ? "rotate-0" : "-rotate-90 -translate-y-px"
                }`}
              />
            </button>
          </h3>
        </Show>
        <Show when={showContent()}>{props.children}</Show>
      </div>
    </div>
  );
};
