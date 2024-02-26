import {
	A as RouterAnchor,
	useLocation,
	type AnchorProps,
} from "@solidjs/router";
import { Show } from "solid-js";
import { getLocaleFromPathname, isValidLocale } from "~/i18n/helpers";

export function A(props: AnchorProps) {
	const { pathname } = useLocation();
	const locale = () => getLocaleFromPathname(pathname);

	return (
		<Show when={isValidLocale(locale())} fallback={<RouterAnchor {...props} />}>
			<RouterAnchor {...props} hreflang={locale()} rel="alternate" />
		</Show>
	);
}
