import { Link } from "solid-app-router";
import { ParentProps } from "solid-js";
import { createEffect, children, createMemo, createUniqueId } from "solid-js";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { Title } from "./components/Main";
import Terminal from "./components/Terminal";

import { usePageState } from "./components/PageStateContext";
import { onMount } from "solid-js";

let hashCode = function (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    hash = (hash << 5) - hash + code;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

function Anchor(props: ParentProps<{ id: string }>) {
  return (
    <a class="hover:underline" href={`#${props.id}`}>
      {props.children}
    </a>
  );
}

const boldClass = "font-bold text-solid-default dark:text-solid-darkdefault ";

export default {
  strong: (props) => <span class={boldClass}>{props.children}</span>,
  h1: (props) => (
    <h1
      {...props}
      class={
        boldClass +
        "heading mt-10 mb-6 -mx-.5 break-words text-5xl leading-tight"
      }
    >
      <Anchor id={props.id}>{props.children}</Anchor>
    </h1>
  ),
  ssr: (props) => <>{props.children}</>,
  spa: (props) => <></>,
  h2: (props) => {
    const { addSection } = usePageState();
    onMount(() => {
      addSection(props.children, props.id);
    });
    return (
      <h2
        {...props}
        class={boldClass + "heading text-3xl leading-10 mt-14 mb-6"}
      >
        <Anchor id={props.id}>{props.children}</Anchor>
      </h2>
    );
  },
  h3: (props) => (
    <h3 {...props} class={boldClass + "heading text-2xl leading-9 mt-14 mb-6"}>
      <Anchor id={props.id}>{props.children}</Anchor>
    </h3>
  ),
  h4: (props) => (
    <h4 {...props} class="heading text-xl font-bold leading-9 mt-14 mb-4">
      <Anchor id={props.id}>{props.children}</Anchor>
    </h4>
  ),
  h5: (props) => (
    <h5 {...props} class="text-xl leading-9 mt-14 mb-4 font-medium">
      <Anchor id={props.id}>{props.children}</Anchor>
    </h5>
  ),
  h6: (props) => (
    <h6 {...props} class="text-xl font-400">
      <Anchor id={props.id}>{props.children}</Anchor>
    </h6>
  ),
  p: (props) => (
    <p {...props} class="text-lg font-400 my-4">
      {props.children}
    </p>
  ),
  a: (props) => {
    return (
      <Link
        {...props}
        class="text-link dark:text-link-dark break-normal border-b border-link border-opacity-0 hover:border-opacity-100 duration-100 ease-in transition leading-normal"
      >
        {props.children}
      </Link>
    );
  },
  li: (props) => (
    <li {...props} class="mb-2">
      {props.children}
    </li>
  ),
  ul: (props) => (
    <ul {...props} class="list-disc pl-8 mb-2">
      {props.children}
    </ul>
  ),
  ol: (props) => (
    <ol {...props} class="list-decimal pl-8 mb-2">
      {props.children}
    </ol>
  ),
  nav: (props) => <nav {...props}>{props.children}</nav>,
  Link,
  TesterComponent: (props) => (
    <p>
      Remove This Now!!! If you see this it means that markdown custom
      components does work
    </p>
  ),
  code: (props) => {
    return (
      <code className="inline text-code font-mono" {...props}>
        {props.children}
      </code>
    );
  },
  pre: (props) => (
    <pre classList={{ "font-mono": true }} {...props}>
      {props.children}
    </pre>
  ),
  "data-lsp": (props) => {
    const id = createUniqueId();
    createEffect(() => {
      tippy(`[data-template="${id}"]`, {
        content() {
          const template = document.getElementById(id);
          return template.innerHTML;
        },
        allowHTML: true,
      });
    });
    return (
      <span class={`data-lsp`} data-template={id}>
        {props.children}
        <div id={id} style="display: none;">
          <pre class="text-white bg-transparent text-xs p-0 m-0 border-0">
            {props.lsp}
          </pre>
        </div>
      </span>
    );
  },
  "docs-error": (props) => {
    return (
      <div class="docs-error">
        <p>
          <span class="text-red-500">Error:</span>
          {props.children}
        </p>
      </div>
    );
  },
  "docs-info": (props) => {
    return (
      <div class="docs-error">
        <p>
          <span class="text-red-500">Error:</span>
          {props.children}
        </p>
      </div>
    );
  },
  response: (props) => {
    return <span>{props.children}</span>;
  },
  void: (props) => {
    return <span>{props.children}</span>;
  },
  unknown: (props) => {
    return <span>{props.children}</span>;
  },
  terminal: Terminal,
  Title,
};
