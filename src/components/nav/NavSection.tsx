import { NavLink, useLocation } from "@solidjs/router";
import IconChevron from "~icons/heroicons-outline/chevron-right";

import { usePageState } from "../context/PageStateContext";
import {
  For,
  Show,
  createSignal,
  ParentProps,
  createUniqueId,
  createEffect,
} from "solid-js";

export function CollapsedIcon(props) {
  return <div class={"duration-100 ease-in transition" + props.class}>▼</div>;
}

type CollapsibleProps = ParentProps<{
  startCollapsed?: boolean;
  header: string;
}>;

export function Collapsible(props: CollapsibleProps) {
  const [collapsed, setCollapsed] = createSignal(props.startCollapsed || false);

  const id = createUniqueId();

  return (
    <li value={props.header} class="mt-2">
      <SectionHeader
        collapsed={collapsed()}
        onClick={() => setCollapsed((prev) => !prev)}
        panelId={id}
      >
        {props.header}
      </SectionHeader>
      <Show when={!collapsed()}>
        <SectionPanel id={id}>{props.children}</SectionPanel>
      </Show>
    </li>
  );
}

export function SectionHeader(
  props: ParentProps<{
    collapsed: boolean;
    panelId: string;
    onClick: () => void;
  }>
) {
  return (
    <h3>
      <button
        class="w-full text-solid-dark dark:text-solid-light text-left relative flex items-center justify-between py-2"
        onClick={props.onClick}
        aria-expanded={!props.collapsed}
        aria-controls={props.panelId}
      >
        {props.children}
        <IconChevron class="w-6 h-6 text-solid-lightaction dark:text-solid-darkaction" />
      </button>
    </h3>
  );
}

function SectionPanel(props: ParentProps<{ id: string }>) {
  return (
    <ul
      id={props.id}
      class="opacity-100 border-l border-solid-lightitem dark:border-solid-darkitem pl-4"
      style="list-none transition: opacity 250ms ease-in-out 0s; animation: 250ms ease-in-out 0s 1 normal none running nav-fadein;"
    >
      {props.children}
    </ul>
  );
}

export function NavItem(props) {
  const isActive = () => {
    return props.href === useLocation().pathname;
  };

  const { sections } = usePageState();

  return (
    <li class="">
      <NavLink
        class="p-2 text-base w-full rounded text-left relative flex items-center justify-between"
        {...props}
        inactiveClass="hover:text-solid-light hover:dark:text-solid-darkdefault"
        activeClass="text-white bg-solid-accent dark:bg-solid-light border-blue-40 active"
        end={true}
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
