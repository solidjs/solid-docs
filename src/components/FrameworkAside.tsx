import { JSXElement, PropsWithChildren, useContext } from "solid-js";
import { ConfigContext, OtherFramework } from "./ConfigContext";
import { BiLogoReact, BiLogoVuejs, BiSolidBrain, BiBook } from "solid-icons/bi";
import { IoAccessibility } from "solid-icons/io";
import { SiSvelte } from "solid-icons/si";
import { isServer } from "solid-js/web";

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
  | "advanced";

const logoProps = { size: "1.6rem", class: "inline mr-2" };

const logos: Record<AsideType, () => JSXElement> = {
  react: () => <BiLogoReact {...logoProps} />,
  svelte: () => <SiSvelte {...logoProps} />,
  vue: () => <BiLogoVuejs {...logoProps} />,
  accessibility: () => <IoAccessibility {...logoProps} />,
  theory: () => <BiBook {...logoProps} />,
  advanced: () => <BiSolidBrain {...logoProps} />,
};

// TODO: why is this having trouble in SSR?
const AsideLogo = (props: { type: AsideType }) => {
  if (isServer) return;

  return logos[props.type]();
};

const asideTitles: Record<AsideType, JSXElement> = {
  react: (
    <>
      <AsideLogo type="react" />
      Since you're coming from React
    </>
  ),
  svelte: (
    <>
      <AsideLogo type="svelte" />
      Since you're coming from Svelte
    </>
  ),
  vue: (
    <>
      <AsideLogo type="vue" />
      Since you're coming from Vue
    </>
  ),
  accessibility: (
    <>
      <AsideLogo type="accessibility" />
      Accessibility note
    </>
  ),
  theory: (
    <>
      <AsideLogo type="theory" />
      Some theory
    </>
  ),
  advanced: (
    <>
      <AsideLogo type="advanced" />
      Advanced concepts (Optional)
    </>
  ),
};

interface IAsideProps {
  show?: boolean;
  type: AsideType;
}

export const Aside = (props: PropsWithChildren<IAsideProps>) => {
  const title = () => asideTitles[props.type];

  return (
    <div
      style={{
        display: props.show !== false ? "block" : "none",
      }}
      class="p-5 rounded my-10 text-base dark:text-dark bg-highlight dark:bg-highlight-dark"
    >
      <h3 class="text-xl">{title()}</h3>
      {props.children}
    </div>
  );
};
