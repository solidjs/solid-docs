import { NavLink } from "@solidjs/router";
import IconChevron from "~icons/heroicons-outline/chevron-right";

interface INextSectionProps {
  title: string;
  href: string;
}

export const NextSection = (props: INextSectionProps) => (
  <div class="flex justify-end">
    <NavLink
      class="my-10 flex items-center border dark:border-solid-darkitem rounded-lg p-4 justify-between group w-80"
      href={props.href}
    >
      <div class="flex flex-col">
        <span class="uppercase dark:text-neutral-500 text-xs font-semibold">Next</span>
        {props.title}
      </div>
      <IconChevron class="w-6 h-6 text-solid-lightaction dark:text-solid-darkaction transform transition group-hover:translate-x-2"/>
    </NavLink>
  </div>
);
