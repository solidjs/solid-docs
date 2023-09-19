import { createSignal, JSX, ParentProps, Show } from "solid-js";
import { useConfig, OtherFramework } from "../context/ConfigContext";
import IconAccessibility from "~icons/icomoon-free/accessibility";
import IconReact from "~icons/mdi/react";
import IconVue from "~icons/mdi/vuejs";
import IconAngular from "~icons/mdi/angular";
import IconSvelte from "~icons/simple-icons/svelte";
import IconBulb from "~icons/heroicons-solid/light-bulb";
import IconBrain from "~icons/mdi/brain";
import IconPencil from "~icons/mdi/lead-pencil";
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
  advanced: { title: "Advanced", logo: <IconBrain {...logoProps} /> },
  note: { title: "Note", logo: <IconPencil {...logoProps} /> },
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
  const [getShowContent, setShowContent] = createSignal(!props.collapsible);
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
      } w-full flex aside p-4 rounded-lg my-4${
        preferDark() ? " text-black" : " text-white"
      }${bgColor() ? "" : " bg-solid-accent"} gap-2 ${props.class ?? ""}`}
      style={`${bgColor() ? `background-color: ${bgColor()}` : ""}`}
    >
      <div>{logo()}</div>
      <div class="w-full">
        <Show when={!!title() && !props.collapsible}>
          <h3 class="font-semibold mb-2">{title()}</h3>
        </Show>
        <Show when={!!title() && props.collapsible}>
          <h3 class="font-semibold">
            <button
              aria-label={`Show expanded ${title()} content`}
              class="flex gap-3"
              onClick={() => setShowContent(!getShowContent())}
            >
              {title()}
              <CollapsedIcon
                class={`flex-0 transform ${
                  getShowContent() ? "rotate-0" : "-rotate-90 -translate-y-px"
                }`}
              />
            </button>
          </h3>
        </Show>
        <Show when={getShowContent()}>{props.children}</Show>
      </div>
    </div>
  );
};
