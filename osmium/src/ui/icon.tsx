import { type Component, omit } from "solid-js";
import type { ComponentProps } from "@solidjs/web";
import { dynamic } from "@solidjs/web";

export type IconComponent = Component<ComponentProps<"svg">>;

/** Renders a heroicon imported from `~icons/heroicons/*`. */
export function Icon(props: ComponentProps<"svg"> & { path: IconComponent }) {
	const Svg = dynamic(() => props.path);
	return <Svg {...omit(props, "path")} />;
}
