import { JSX, JSXElement, For, createEffect } from "solid-js";
import { useConfig } from "~/components/context/ConfigContext";
import IconJs from "~icons/logos/javascript";
import IconTs from "~icons/logos/typescript-icon";
import IconReact from "~icons/vscode-icons/file-type-reactjs";
import IconVue from "~icons/vscode-icons/file-type-vue";
import IconSvelte from "~icons/vscode-icons/file-type-svelte";
import IconAngular from "~icons/vscode-icons/file-type-angular";
import IconNone from "~icons/heroicons-outline/ban";

export const Preferences = (props) => {
  const [config, setConfig] = useConfig();

  return (
    <div class={`flex flex-col gap-4 ${props.isForContent ? "max-w-2/3" : ""}`}>
      <div class="flex flex-col gap-2 w-full">
        <legend class={!props.isForContent ? "text-sm" : ""}>
          Do you prefer JavaScript or TypeScript?
        </legend>
        <RadioGroup
          name={`typescript${props.isForContent ? "-content" : ""}`}
          checked={config.typescript ? "typescript" : "javascript"}
          onChange={(value) => setConfig("typescript", value === "typescript")}
          radios={[
            { icon: <IconJs />, label: "JavaScript", value: "javascript" },
            { icon: <IconTs />, label: "TypeScript", value: "typescript" },
          ]}
        />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <legend class={!props.isForContent ? "text-sm" : ""}>
          Are you coming from any of the following frameworks?
        </legend>
        <RadioGroup
          name={`comingFrom${props.isForContent ? "-content" : ""}`}
          checked={config.comingFrom}
          onChange={(value) => setConfig("comingFrom", value)}
          radios={[
            { icon: <IconReact />, label: "React", value: "react" },
            { icon: <IconVue />, label: "Vue", value: "vue" },
            { icon: <IconSvelte />, label: "Svelte", value: "svelte" },
            { icon: <IconAngular />, label: "Angular", value: "angular" },
            { icon: <IconNone />, label: "None", value: "none" },
          ]}
        />
      </div>
    </div>
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
    <fieldset class="flex items-center gap-2 flex-wrap">
      <For each={props.radios}>
        {(radio) => (
          <label class="flex-1 cursor-pointer">
            <input
              type="radio"
              name={props.name}
              class="sr-only peer"
              id={`${props.name}-${radio.value}`}
              value={radio.value}
              onChange={(e) => props.onChange(e.currentTarget.value as T)}
              checked={props.checked === radio.value}
            />
            <RadioButton icon={radio.icon} label={radio.label} />
          </label>
        )}
      </For>
    </fieldset>
  );
};

interface RadioButtonProps<T extends string> {
  icon: JSXElement | null;
  label: string;
}

const RadioButton = <T extends string>(props: RadioButtonProps<T>) => {
  return (
    <div class="border border-solid-lightitem dark:border-solid-darkitem peer-checked:(bg-solid-light border-solid-accent) dark:peer-checked:bg-solid-dark text-sm rounded flex items-center gap-2 p-2 peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600">
      {props.icon}
      {props.label}
    </div>
  );
};
