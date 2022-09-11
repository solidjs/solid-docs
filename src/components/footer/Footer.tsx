import { HelpButton } from "./HelpButton";
import IconEdit from "~icons/heroicons-outline/pencil-alt";
import { useLocation } from "@solidjs/router";

export default function Footer() {
  const location = useLocation();

  const pathname = () =>
    location.pathname === "/" ? "/index" : location.pathname;

  const url = () =>
    `https://github.com/solidjs/solid-docs-next/edit/main/content${pathname()}.mdx`;

  return (
    <footer class="flex flex-col sm:flex-row justify-between pb-8 border-t-1 mt-8 border-solid-lightitem dark:border-solid-darkitem pt-10">
      <HelpButton />

      <a class="flex items-center gap-2 hover:underline" href={url()}>
        <IconEdit/> Edit this page
      </a>
    </footer>
  );
}
