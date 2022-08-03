import {JSX, JSXElement, For, createEffect } from "solid-js";
import { useConfig } from "~/components/context/ConfigContext";
import IconJs from "~icons/logos/javascript";
import IconTs from "~icons/logos/typescript-icon";
import IconReact from "~icons/vscode-icons/file-type-reactjs";
import IconVue from "~icons/vscode-icons/file-type-vue";
import IconSvelte from "~icons/vscode-icons/file-type-svelte";
import IconAngular from "~icons/vscode-icons/file-type-angular";

export const Preferences = () => {
  const [config, setConfig] = useConfig();

  createEffect(() => {
    console.log(config.typescript);
  })
  return (
    <>
      <RadioGroup
        legend="Do you prefer JavaScript or TypeScript?"
        name="typescript"
        checked={config.typescript ? "typescript" : "javascript"}
        onChange={(value) => setConfig("typescript", value === "typescript")}
        radios={[
          { icon: <IconJs />, label: "JavaScript", value: "javascript" },
          { icon: <IconTs />, label: "TypeScript", value: "typescript" },
        ]}
      />
      <RadioGroup
        legend="Are you coming from any of the following frameworks?"
        name="comingFrom"
        checked={config.comingFrom}
        onChange={(value) => setConfig("comingFrom", value)}
        radios={[
          { icon: <IconReact />, label: "React", value: "react" },
          { icon: <IconVue />, label: "Vue", value: "vue" },
          { icon: <IconSvelte />, label: "Svelte", value: "svelte" },
          { icon: <IconAngular />, label: "Angular", value: "angular" },
          { icon: <></>, label: "None of the above", value: "none" },
        ]}
      />
    </>
  );
};

interface RadioGroupProps<T extends string> {
  legend: string;
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
    <fieldset class="mt-10">
      <legend class="text-xl">{props.legend}</legend>
      <For each={props.radios}>
        {(radio) => (
          <div
            classList={{
              "p-5 flex gap-2 text-2xl mt-5 align-start": true,
              "rounded text-base dark:text-dark bg-highlight dark:bg-highlight-dark":
                props.checked === radio.value,
            }}
          >
            <input
              type="radio"
              name={props.name}
              id={`${props.name}-${radio.value}`}
              value={radio.value}
              onChange={(e) => props.onChange(e.currentTarget.value as T)}
              checked={props.checked === radio.value}
            />
            <label
              class="flex gap-2 cursor-pointer"
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
