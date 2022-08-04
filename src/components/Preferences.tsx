import {JSX, JSXElement, For, createEffect } from "solid-js";
import { useConfig } from "~/components/context/ConfigContext";
import IconJs from "~icons/logos/javascript";
import IconTs from "~icons/logos/typescript-icon";
import IconReact from "~icons/vscode-icons/file-type-reactjs";
import IconVue from "~icons/vscode-icons/file-type-vue";
import IconSvelte from "~icons/vscode-icons/file-type-svelte";
import IconAngular from "~icons/vscode-icons/file-type-angular";

export const Preferences = (props: {questionClass: string}) => {
  const [config, setConfig] = useConfig();

  return (
    <>
      <legend class={props.questionClass}>Do you prefer JavaScript or TypeScript?</legend>
      <RadioGroup
        name="typescript"
        checked={config.typescript ? "typescript" : "javascript"}
        onChange={(value) => setConfig("typescript", value === "typescript")}
        radios={[
          { icon: <IconJs />, label: "JavaScript", value: "javascript" },
          { icon: <IconTs />, label: "TypeScript", value: "typescript" },
        ]}
      />
      <legend class={props.questionClass}>
        Are you coming from any of the following frameworks?
      </legend>
      <RadioGroup
        name="comingFrom"
        checked={config.comingFrom}
        onChange={(value) => setConfig("comingFrom", value)}
        radios={[
          { icon: <IconReact />, label: "React", value: "react" },
          { icon: <IconVue />, label: "Vue", value: "vue" },
          { icon: <IconSvelte />, label: "Svelte", value: "svelte" },
          { icon: <IconAngular />, label: "Angular", value: "angular" },
          { icon: <></>, label: "None", value: "none" },
        ]}
      />
    </>
  );
};

interface RadioGroupProps<T extends string> {
  name: string;
  checked: T;
  onChange: (value: T) => void;
  radios: {
    value: T;
    label: string;
    icon: JSXElement | null;
  }[];
}

const RadioGroup = <T extends string>(props: RadioGroupProps<T>) => {
  return (
    <fieldset class="flex my-2 gap-4 flex-wrap">
      <For each={props.radios}>
        {(radio) => (
          <div class="flex gap-2 items-center"> 
            <input
              type="radio"
              name={props.name}
              id={`${props.name}-${radio.value}`}
              value={radio.value}
              onChange={(e) => props.onChange(e.currentTarget.value as T)}
              checked={props.checked === radio.value}
            />
            <label
              class="flex gap-2 cursor-pointer -mb-1"
              for={`${props.name}-${radio.value}`}
            >
              {radio.icon}
              {radio.label}
            </label>
          </div>
        )}
      </For>
    </fieldset>
  );
};
