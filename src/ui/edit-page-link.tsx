import { Component, createMemo } from "solid-js";
import { Icon } from "solid-heroicons";
import { pencilSquare } from "solid-heroicons/solid";
import { useLocation } from "@solidjs/router";

export const EditPageLink: Component = () => {
	const location = useLocation();
	const path = createMemo(() => {
		return location.pathname !== "/" ? location.pathname : "/index";
	});
	return (
		<a
			class="flex no-underline text-blue-350 font-normal hover:font-bold hover:text-blue-700 dark:hover:text-blue-300 dark:text-slate-300 relative tracking-[0.3px]"
			href={`https://github.com/solidjs/solid-docs-next/edit/main/src/routes${path()}.mdx`}
		>
			<Icon class="mr-1 w-[15px] -top-[1px]" path={pencilSquare} />
			Edit this page
		</a>
	);
};
