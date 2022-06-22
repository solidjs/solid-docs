import {
  createSignal,
  JSX,
  PropsWithChildren,
  Show,
  useContext,
} from "solid-js";
import { ConfigContext, OtherFramework } from "./ConfigContext";
import IconAccessibility from "~icons/icomoon-free/accessibility";
import IconReact from "~icons/mdi/react";
import IconVue from "~icons/mdi/vuejs";
import IconAngular from "~icons/mdi/angular";
import IconSvelte from "~icons/simple-icons/svelte";
import IconBulb from "~icons/mdi/lightbulb";
import IconBrain from "~icons/mdi/brain";
import "./Aside.css";
import { CollapsedIcon } from "./nav/NavSection";

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
  | "angular"
  | "accessibility"
  | "theory"
  | "advanced"
  | "general";

const logoProps = { "font-size": "1.2rem" };

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
  angular: {
    title: "Since you're coming from Angular",
    logo: <IconAngular {...logoProps} />,
  },
  accessibility: {
    title: "Accessibility note",
    logo: <IconAccessibility {...logoProps} />,
  },
  theory: { title: "Some theory", logo: <></> },
  advanced: { title: "Advanced concepts", logo: <IconBrain {...logoProps} /> },
  general: { title: null, logo: <IconBulb {...logoProps} /> },
});

interface IAsideProps {
  show?: boolean;
  type: AsideType;
  collapsible?: boolean;
  title?: string;
}

export const Aside = (props: PropsWithChildren<IAsideProps>) => {
  const [showContent, setShowContent] = createSignal(!props.collapsible);
  const definition = asideDefinition()[props.type];
  const title = () => props.title || definition.title;
  const logo = () => definition.logo;

  return (
    <Show when={props.show !== false}>
      <div
        aria-live="polite"
        class="flex aside p-5 rounded mt-10 mb-14 text-white bg-solid-medium dark:bg-darkdefault gap-2"
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
    </Show>
  );
};
