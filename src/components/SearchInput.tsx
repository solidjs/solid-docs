import IconSearch from "~icons/heroicons-solid/search"

interface SearchInputProps {
  label: string,
  small: boolean,
  input: string,
  onInput: () => void
}

export default function SearchInput(props: SearchInputProps) {
	return (
		<div class="relative flex-1">
			<label for="title" class="sr-only">
				{props.label}
			</label>
			<input
				class={`${
					props.small ? "px-4 py-2" : "p-4"
				} border border-solid-lightitem dark:border-solid-darkitem rounded-lg bg-transparent w-full flex-1`}
				id="title"
				value={props.input}
				onInput={props.onInput}
			/>
			<div class="absolute right-0 top-0 bottom-0 grid place-content-center px-2">
				<IconSearch class="w-6 h-6 dark:text-solid-darkaction" />
			</div>
		</div>
	)
}
