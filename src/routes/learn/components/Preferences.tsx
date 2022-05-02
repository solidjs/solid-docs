import { useContext, JSX, JSXElement, For } from "solid-js";
import { ConfigContext } from "~/components/ConfigContext";
import IconJs from "~icons/logos/javascript";
import IconTs from "~icons/logos/typescript-icon";

export const Preferences = () => {
  const [config, setConfig] = useContext(ConfigContext);

  const configChange: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    setConfig((c) => ({ ...c, [e.currentTarget.name]: e.currentTarget.value }));
  };

  return (
    <>
      <RadioGroup
        legend="Do you prefer JavaScript or Typescript?"
        name="codeFormat"
        checked={config().codeFormat}
        radios={[
          {
            label: (
              <>
                <IconJs /> JavaScript
              </>
            ),
            value: "jsx",
            onChange: configChange,
          },
          {
            label: (
              <>
                <IconTs /> Typescript
              </>
            ),
            value: "tsx",
            onChange: configChange,
          },
        ]}
      />

      <fieldset class="mt-10">
        <legend>Are you coming from Any of the following frameworks?</legend>
        <input
          type="radio"
          name="comingFrom"
          id="react"
          value="react"
          onChange={configChange}
          checked={config().comingFrom === "react"}
        />
        <label for="react">React</label>
        <input
          class="ml-5"
          type="radio"
          name="comingFrom"
          id="vue"
          value="vue"
          onChange={configChange}
          checked={config().comingFrom === "vue"}
        />
        <label for="vue">Vue</label>
        <input
          class="ml-5"
          type="radio"
          name="comingFrom"
          id="svelte"
          value="svelte"
          onChange={configChange}
          checked={config().comingFrom === "svelte"}
        />
        <label for="svelte">Svelte</label>
        <input
          class="ml-5"
          type="radio"
          name="comingFrom"
          id="none"
          value="none"
          onChange={configChange}
          checked={config().comingFrom === "none"}
        />
        <label for="none">None</label>
      </fieldset>
    </>
  );
};

interface IRadioGroupProps<T extends string> {
  legend: string;
  name: string;
  checked: T;
  radios: {
    value: T;
    label: JSXElement | string;
    onChange: JSX.EventHandler<HTMLInputElement, InputEvent>;
  }[];
}

const RadioGroup = <T extends string>(props: IRadioGroupProps<T>) => {
  return (
    <fieldset class="mt-10">
      <legend>{props.legend}</legend>
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
              onChange={radio.onChange}
              checked={props.checked === radio.value}
            />
            <label
              class="flex gap-2 cursor-pointer"
              for={`${props.name}-${radio.value}`}
            >
              {radio.label}
            </label>
          </div>
        )}
      </For>
    </fieldset>
  );
};
