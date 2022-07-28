import { Component, JSX, ParentProps, Show } from "solid-js";
import { Config, useConfig } from "../context/ConfigContext";

export function IfConfig<T extends keyof Config>(
  props: ParentProps<{
    check: T;
    forValue: Config[T];
    fallback?: JSX.Element;
  }>
) {
  const [config] = useConfig();

  return (
    <Show
      when={config()[props.check] === props.forValue}
      fallback={props.fallback}
    >
      {props.children}
    </Show>
  );
}
