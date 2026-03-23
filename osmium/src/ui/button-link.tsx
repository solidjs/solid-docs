import { splitProps } from "solid-js";
import { A, type RouterLinkProps } from "./i18n-anchor";

type ButtonLinkProps = RouterLinkProps & {
	variant: "primary" | "secondary";
};

export const ButtonLink = (props: ButtonLinkProps) => {
	const [localProps, otherProps] = splitProps(props, ["variant"]);

	return (
		<A
			addLocale
			classList={{
				"rounded-full bg-blue-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-blue-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/50 active:bg-blue-500":
					localProps.variant === "primary",
				"rounded-full bg-slate-800 py-2 px-4 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-300":
					localProps.variant === "secondary",
			}}
			{...otherProps}
		/>
	);
};
