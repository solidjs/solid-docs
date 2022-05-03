import { NavLink } from "solid-app-router";
import { ChevronIcon } from "./Logo";

interface INextSectionProps {
  title: string;
  href: string;
}

export const NextSection = (props: INextSectionProps) => (
  <div class="flex justify-end">
    <NavLink
      class="my-10 inline-flex font-bold items-center border-2 border-transparent outline-none focus:ring-1 focus:ring-offset-2 focus:ring-link active:bg-link active:text-white active:ring-0 active:ring-offset-0 leading-normal bg-link text-white hover:bg-opacity-80 text-base rounded-lg px-4 py-2"
      href={props.href}
    >
      Next Section: {props.title} <ChevronIcon />
    </NavLink>
  </div>
);
