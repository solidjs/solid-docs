import { omit } from "solid-js";
import type { ComponentProps } from "@solidjs/web";

type ButtonLinkProps = ComponentProps<"a"> & {
	variant: "primary" | "secondary";
};

export const ButtonLink = (props: ButtonLinkProps) => {
	const otherProps = omit(props, "variant");

	return (
		<a
			class={{
				"rounded-full bg-blue-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-blue-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/50 active:bg-blue-500":
					props.variant === "primary",
				"rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-300":
					props.variant === "secondary",
			}}
			{...otherProps}
		/>
	);
};
