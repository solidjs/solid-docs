import { JSXElement } from "solid-js";

const GridCard = (props: { icon?: JSXElement | null; label: string }) => {
  return (
    <div
      class="border border-solid-lightitem dark:border-solid-darkitem peer-checked:(bg-solid-light border-solid-accent) dark:peer-checked:bg-solid-dark text-sm rounded flex items-center gap-2 p-4 peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600 light:hover:text-white h-20 p-2 text-base w-full text-left relative flex items-center justify-between transition hover:bg-solid-accent"
    >
      {props.icon}
      {props.label}
    </div>
  );
};

export default GridCard;
