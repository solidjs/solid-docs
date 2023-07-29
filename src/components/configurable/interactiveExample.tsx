import { JSXElement } from "solid-js"
import IconSparkles from "~icons/heroicons-solid/sparkles"

export default function InteractiveExample(props: {children: JSXElement}) {
	return (
		<div class="rounded-lg border border-solid-lightitem dark:border-0 bg-solid-light dark:bg-solid-dark p-6 my-6">
			<div class="flex items-center gap-2 font-semibold">
				<IconSparkles />
        Interactive example
			</div>
			<div class="mt-4">{props.children}</div>
		</div>
	)
}
