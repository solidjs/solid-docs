import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  useHeadlessSelectOptionChild,
} from "solid-headless";

import { useLocation } from "solid-app-router";

function CollapsedIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      class={"duration-100 ease-in transition" + props.class}
      style="min-width: 20px; min-height: 20px;"
    >
      <g fill="none" fill-rule="evenodd" transform="translate(-446 -398)">
        <path
          fill="currentColor"
          fill-rule="nonzero"
          d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z"
          transform="translate(356.5 164.5)"
        ></path>
        <polygon points="446 418 466 418 466 398 446 398"></polygon>
      </g>
    </svg>
  );
}

export function NavGroup(props) {
  return (
    <AccordionItem value={props.header} class="mt-2" as="li">
      <SectionHeader href={props.href}>{props.header}</SectionHeader>
      <SectionPanel>{props.children}</SectionPanel>
    </AccordionItem>
  );
}

function SectionHeader(props) {
  let child = useHeadlessSelectOptionChild();
  const location = useLocation();
  let isActive = () => location.pathname === props.href;
  return (
    <AccordionHeader>
      <a
        classList={{
          "p-2 pr-2 w-full rounded-none lg:rounded-r-lg text-left hover:bg-gray-5 dark:hover:bg-gray-80 relative flex items-center justify-between pl-5 text-base font-bold":
            true,
          "text-primary dark:text-primary-dark": !isActive(),
          "text-link dark:text-link-dark bg-highlight dark:bg-highlight-dark border-blue-40 hover:bg-highlight hover:text-link dark:hover:bg-highlight-dark dark:hover:text-link-dark active":
            isActive(),
        }}
        onClick={() => !child.isSelected() && child.select()}
        // title={props.faq.question}
        href={props.href}
      >
        <>
          {props.children}
          <span class={`pr-1`}>
            <CollapsedIcon
              class={`flex-0 transform ${
                child.isSelected() ? "rotate-0" : "-rotate-90"
              } w-5 h-5 `}
            />
          </span>
        </>
      </a>
    </AccordionHeader>
  );
}

function SectionPanel(props) {
  return (
    <AccordionPanel
      as="ul"
      class="opacity-100"
      style="transition: opacity 250ms ease-in-out 0s; animation: 250ms ease-in-out 0s 1 normal none running nav-fadein;"
    >
      {props.children}
    </AccordionPanel>
  );
}
