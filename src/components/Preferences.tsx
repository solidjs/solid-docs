import { useContext, JSX, JSXElement, For } from "solid-js";
import { ConfigContext } from "~/components/context/ConfigContext";
import IconJs from "~icons/logos/javascript";
import IconTs from "~icons/logos/typescript-icon";
import IconReact from "~icons/vscode-icons/file-type-reactjs";
import IconVue from "~icons/vscode-icons/file-type-vue";
import IconSvelte from "~icons/vscode-icons/file-type-svelte";
import IconAngular from "~icons/vscode-icons/file-type-angular";

export const Preferences = () => {
  const [config, setConfig] = useContext(ConfigContext);

  const configChange: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    setConfig((c) => ({ ...c, [e.currentTarget.name]: e.currentTarget.value }));
  };

  return (
    <>
      <RadioGroup
        legend="Do you prefer JavaScript or TypeScript?"
        name="codeFormat"
        checked={config().codeFormat}
        onChange={configChange}
        radios={[
          { icon: <IconJs />, label: "JavaScript", value: "jsx" },
          { icon: <IconTs />, label: "TypeScript", value: "tsx" },
        ]}
      />
      <RadioGroup
        legend="Are you coming from any of the following frameworks?"
        name="comingFrom"
        checked={config().comingFrom}
        onChange={configChange}
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

interface IRadioGroupProps<T extends string> {
  legend: string;
  name: string;
  checked: T;
  onChange: JSX.EventHandler<HTMLInputElement, InputEvent>;
  radios: {
    value: T;
    label: string;
    icon: JSXElement | null;
  }[];
}

const RadioGroup = <T extends string>(props: IRadioGroupProps<T>) => {
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
              onChange={props.onChange}
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
