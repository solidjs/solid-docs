import { Dynamic } from "solid-js/web";
import { A, type RouterLinkProps } from "./i18n-anchor";

type ButtonLinkProps = RouterLinkProps & {
	variant: "primary" | "secondary";
};

export const ButtonLink = (props: ButtonLinkProps) => {
	const target = () => (props.href.startsWith("http") ? "_blank" : undefined);
	return (
		<Dynamic
			addLocale
			component={Boolean(target()) ? "a" : A}
			classList={{
				"rounded-full bg-blue-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-blue-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/50 active:bg-blue-500":
					props.variant === "primary",
				"rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-300":
					props.variant === "secondary",
			}}
			target={target()}
			rel={target() === "_blank" ? "noopener noreferrer" : undefined}
			{...props}
		/>
	);
};
