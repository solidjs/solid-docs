import {
	A as RouterAnchor,
	useLocation,
	type AnchorProps,
} from "@solidjs/router";
import { Show } from "solid-js";
import { getValidLocaleFromPathname } from "~/i18n/helpers";

export type RouterLinkProps = AnchorProps & {
	addLocale?: boolean;
};

export function A(props: RouterLinkProps) {
	const { pathname } = useLocation();
	const locale = () => getValidLocaleFromPathname(pathname);

	return (
		<Show when={locale()} fallback={<RouterAnchor {...props} />} keyed>
			{(loc) => (
				<RouterAnchor
					{...props}
					href={props.addLocale ? `${loc}${props.href}` : props.href}
					hreflang={loc}
					rel="alternate"
				/>
			)}
		</Show>
	);
}
