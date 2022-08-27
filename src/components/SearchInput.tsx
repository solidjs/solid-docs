import IconSearch from "~icons/heroicons-solid/search";

export default function SearchInput(props) {
    return <div class="border border-solid-lightiten dark:broder-solid-darkitem rounded-lg flex justify-between">
    <label for="title" class="sr-only">{props.label}</label>
    <input
      class="p-4 bg-transparent w-full flex-1"
      id="title"
      value={props.input}
      onInput={props.onInput}
    />
    <IconSearch class="w-6 h-6 dark:text-solid-darkaction"/>
  </div>
}