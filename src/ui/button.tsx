import { useNavigate } from "@solidjs/router";

type ButtonProps = {
	variant: "primary" | "secondary";
	externalLink?: boolean;
	href: string;
	children: string;
};

export const Button = (props: ButtonProps) => {
	const navigate = useNavigate();
	return (
		<button
			classList={{
				"rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500":
					props.variant === "primary",
				"rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400":
					props.variant === "secondary",
			}}
			onClick={() => {
				if (props.href.match(/https?:\/\//)) {
					window.open(props.href, "_blank");
				} else {
					navigate(props.href);
				}
			}}
		>
			{props.children}
		</button>
	);
};
