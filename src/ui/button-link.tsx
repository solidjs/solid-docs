import { Dynamic } from "solid-js/web";
import { A, type RouterLinkProps } from "./i18n-anchor";

type ButtonLinkProps = RouterLinkProps & {
	variant: "primary" | "secondary";
};

export const ButtonLink = (props: ButtonLinkProps) => {
	return (
		<Dynamic
			addLocale
			component={A}
			classList={{
				"rounded-full bg-blue-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-blue-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/50 active:bg-blue-500":
					props.variant === "primary",
				"rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-300":
					props.variant === "secondary",
			}}
			{...props}
		/>
	);
};
