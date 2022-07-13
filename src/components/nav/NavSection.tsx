import { NavLink, useLocation } from "solid-app-router";

import { usePageState } from "../PageStateContext";
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

function SectionHeader(
  props: ParentProps<{
    collapsed: boolean;
    panelId: string;
    onClick: () => void;
  }>
) {
  return (
    <h3>
      <button
        class="p-2 pr-2 w-full h-full text-solid-dark dark:text-white rounded-none lg:rounded-r-lg text-left relative flex items-center justify-between pl-5 text-base font-bold"
        onClick={props.onClick}
        aria-expanded={!props.collapsed}
        aria-controls={props.panelId}
      >
        {props.children}
        <span class={`pr-1`}>
          <CollapsedIcon
            class={`flex-0 transform ${
              props.collapsed ? "-rotate-90 -translate-y-px" : "rotate-0"
            }`}
          />
        </span>
      </button>
    </h3>
  );
}

function SectionPanel(props: ParentProps<{ id: string }>) {
  return (
    <ul
      id={props.id}
      class="opacity-100"
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

  // createEffect ( () => {
  //   console.log( {href: props.href, path: useLocation().pathname });
  // });

  const { sections } = usePageState();

  return (
    <li class="">
      <NavLink
        class="font-semibold text-base p-2 pl-5 w-full rounded-none lg:rounded-r-lg text-left relative flex items-center justify-between"
        {...props}
        inactiveClass="hover:text-solid-light hover:dark:text-solid-darkdefault"
        activeClass="text-white bg-solid-light dark:bg-solid-light border-blue-40 active"
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
