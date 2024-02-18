import { useLocation } from "@solidjs/router";
import { getLocaleFromPathname, missingTranslationMessage } from "~/i18n";

export default function NoEntry() {
	const { pathname } = useLocation();

	return <p>{missingTranslationMessage(getLocaleFromPathname(pathname))}</p>;
}
