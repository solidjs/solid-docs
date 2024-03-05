import {
	A as RouterAnchor,
	useLocation,
	type AnchorProps,
} from "@solidjs/router";
import { Match, Switch, splitProps } from "solid-js";
import { getValidLocaleFromPathname, isExternalURL } from "~/i18n/helpers";

export type RouterLinkProps = AnchorProps & {
	addLocale?: boolean;
};

export function A(props: RouterLinkProps) {
	const { pathname } = useLocation();
	const locale = () => getValidLocaleFromPathname(pathname);
	const external = () => isExternalURL(props.href);

	const [_, rest] = splitProps(props, ["addLocale"]);

	return (
		<Switch fallback={<RouterAnchor {...rest} />}>
			<Match when={!external() && locale()} keyed>
				{(loc) => (
					<RouterAnchor
						{...rest}
						href={
							props.addLocale
								? `/${loc}${props.href}`.replace(/\/$/, "")
								: props.href.replace(/\/$/, "")
						}
						hreflang={loc}
						rel="alternate"
					/>
				)}
			</Match>
			<Match when={external()} keyed>
				<RouterAnchor target="_blank" rel="noopener noreferrer" {...rest} />
			</Match>
		</Switch>
	);
}
