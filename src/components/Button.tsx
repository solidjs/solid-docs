import { JSXElement } from "solid-js";

export default function Button(props: {
  type: "submit" | "button";
  onClick?: (e: any) => void;
  children: JSXElement;
}) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      class="bg-solid-accent hover:bg-solid-accent/90 rounded p-2 font-semibold text-white flex items-center justify-center"
    >
      {props.children}
    </button>
  );
}
