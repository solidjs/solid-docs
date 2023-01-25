import {
  type Component,
  type ComponentProps,
  type JSX,
  createContext,
  createEffect,
  For,
  mergeProps,
  Show,
  splitProps,
  useContext
} from "solid-js";
import md from "~/md";
import { createMutable } from "solid-js/store";
import { Dynamic } from "solid-js/web";

export type Footnotes = {
  [id: string]:  JSX.Element;
}

export const FootnoteContext = createContext<Footnotes>({});

export function FootnoteProvider(props: {children: JSX.Element}) {
  const footnotes: Footnotes = createMutable<Footnotes>({});
  return <FootnoteContext.Provider value={footnotes}>
    {props.children}
  </FootnoteContext.Provider>;
}

export type FnProps = ComponentProps<"a"> & {
  as?: string | Component<any> | keyof JSX.IntrinsicElements;
  id: string;
  children?: JSX.Element;
  term?: JSX.Element;
}

export function Fn(props: FnProps) {
  const footnotes = useContext(FootnoteContext);
  createEffect((lastId: string | undefined) => {
    if (lastId && lastId !== props.id) {
      footnotes[lastId] = undefined;
    }
    footnotes[props.id] = props.children;
    return props.id;
  });
  const [local, linkProps] = splitProps(props, ["as", "classList", "term"])
  return <Show when={props.children}>
    <Show when={props.as} fallback={
      <a
        classList={mergeProps({ footnote: true }, local.classList)}
        href={`#fn-${props.id}`}
        target="_self"
        {...linkProps}
      >{local.term}</a>
    }>
      <Dynamic
        classList={mergeProps({ footnote: true }, local.classList)}
        component={local.as}
        href={`#fn-${props.id}`}
        target="_self"
        {...linkProps}
      >
        {local.term}
      </Dynamic>
    </Show>
  </Show>;
}

export type FootnotesProps = {
  backlinkAs?: string | Component<any> | keyof JSX.IntrinsicElements;
  backlinkContent?: JSX.Element;
  title?: JSX.Element;
  children: never;
}

const ID = 0;
const TEXT = 1;

export function Footnotes(props: FootnotesProps) {
  const footnotes = useContext(FootnoteContext);
  return <>
  <hr/>
    <section role={"doc-endnotes" as any}>
    <Show when={props.title} fallback={<md.h2>Notes</md.h2>}>
      {props.title}
    </Show>

    <ol>
      <For each={Object.entries(footnotes)}>
        {(footnote) => <Show when={footnote[TEXT]}><li id={`fn-${footnote[ID]}`}>
            {footnote[TEXT]}
            {" "}
            <Show when={props.backlinkAs} fallback={
              <a href={`#${footnote[ID]}`} target="_self">{props.backlinkContent || "back"}</a>
            }>
              <Dynamic
                component={props.backlinkAs}
                href={`#${footnote[ID]}`}
                target="_self"
              >{props.backlinkContent || "back"}</Dynamic>
            </Show>
          </li></Show>}
      </For>    
    </ol>
    </section>
  </>
}
