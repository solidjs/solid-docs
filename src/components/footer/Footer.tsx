import { HelpButton } from "./HelpButton";
import IconEdit from "~icons/heroicons-outline/pencil-alt";
import { useLocation } from "solid-app-router";
import { createEffect } from "solid-js";

export default function Footer() {
  const { pathname } = useLocation();

  const url = () =>
    `https://github.com/solidjs/solid-docs-next/edit/main/src/routes${pathname}.mdx`;

  return (
    <footer class="flex flex-col sm:flex-row justify-between pb-8 border-t-1 border-dotted pt-10">
      <HelpButton />

      <a class="flex gap-2 hover:underline" href={url()}>
        <IconEdit></IconEdit> Edit this page
      </a>
    </footer>
  );
}
