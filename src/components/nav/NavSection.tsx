import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  useHeadlessSelectOptionChild,
} from "solid-headless";

import { NavLink, useLocation } from "solid-app-router";

import { usePageState } from "../PageStateContext";
import { createEffect, createSignal } from "solid-js";

function CollapsedIcon(props) {
  return <div class={"duration-100 ease-in transition" + props.class}>▼</div>;
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
  return (
    <AccordionHeader>
      <a
        class="p-2 pr-2 w-full h-full text-solid-dark dark:text-white rounded-none lg:rounded-r-lg text-left relative flex items-center justify-between pl-5 text-base font-bold"
        onClick={() => child.select()}
        href="javascript:"
      >
        <>
          {props.children}
          <span class={`pr-1`}>
            <CollapsedIcon
              class={`flex-0 transform ${
                child.isSelected() ? "rotate-0" : "-rotate-90 -translate-y-px"
              }`}
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

export function NavItem(props) {
  const isActive = () => props.href === useLocation().pathname;

  const { sections } = usePageState();

  return (
    <li class="">
      <NavLink
        class="font-semibold text-base p-2 pl-5 w-full rounded-none lg:rounded-r-lg text-left relative flex items-center justify-between"
        {...props}
        inactiveClass="hover:text-solid-light hover:dark:text-solid-darkdefault"
        activeClass="text-white bg-solid-light dark:bg-solid-light border-blue-40 active"
      >
        {props.children}
      </NavLink>
      <Show when={isActive()}>
        <div class="ml-4">
          <ol class="pl-5 mt-2 list-decimal space-y-1">
            <For each={sections()}>
              {(item) => (
                <li class="text-base">
                  <a href={"#" + item.href}>{item.title}</a>
                </li>
              )}
            </For>
          </ol>
        </div>
      </Show>
    </li>
  );
}
