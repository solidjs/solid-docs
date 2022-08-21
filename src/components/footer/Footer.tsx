import { useLocation } from "@solidjs/router";

import IconEdit from "~icons/heroicons-outline/pencil-alt";

import { HelpButton } from "./HelpButton";

export default function Footer() {
  const location = useLocation();

  const pathname = () =>
    location.pathname === "/" ? "/index" : location.pathname;

  const url = () =>
    `https://github.com/solidjs/solid-docs-next/edit/main/content${pathname()}.mdx`;

  return (
    <footer class="flex flex-col sm:flex-row justify-between pb-8 border-t-1 border-dotted pt-10">
      <HelpButton />

      <a class="flex items-center gap-2 hover:underline" href={url()}>
        <IconEdit/> Edit this page
      </a>
    </footer>
  );
}
