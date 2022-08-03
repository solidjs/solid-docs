import {
  Component,
  createEffect,
  JSX,
  ParentProps,
  Show,
  useContext,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { Config, useConfig } from "../context/ConfigContext";

export function IfConfig<T extends keyof Config>(
  props: ParentProps<{
    check: T;
    forValue: Config[T];
    fallback?: JSX.Element;
    block?: boolean;
  }>
) {
  const [config] = useConfig();

  return (
    <Dynamic component={props.block ? "div" : "span"}>
      <Show
        when={config[props.check] === props.forValue}
        fallback={props.fallback}
      >
        {props.children}
      </Show>
    </Dynamic>
  );
}

export function IfTS(props: ParentProps<{fallback?: JSX.Element, block?: boolean}>) {
  return <IfConfig check="typescript" forValue={true} {...props} />;
}