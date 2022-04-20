import { useContext, JSX } from "solid-js";
import { ConfigContext } from "~/components/ConfigContext";

export const Preferences = () => {
  const [config, setConfig] = useContext(ConfigContext);

  const configChange: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    setConfig((c) => ({ ...c, [e.currentTarget.name]: e.currentTarget.value }));
  };

  return (
    <>
      <fieldset class="mt-5">
        <legend>
          Before we get started, do you use JavaScript or Typescript?
        </legend>
        <input
          type="radio"
          name="codeFormat"
          id="jsx"
          value="jsx"
          onChange={configChange}
          checked={config().codeFormat === "jsx"}
        />
        <label for="jsx">JavaScript</label>
        <input
          class="ml-5"
          type="radio"
          name="codeFormat"
          id="tsx"
          value="tsx"
          onChange={configChange}
          checked={config().codeFormat === "tsx"}
        />
        <label for="tsx">Typescript</label>
      </fieldset>

      <fieldset class="mt-5">
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
