import { useLocation } from "@solidjs/router";
import { getValidLocaleFromPathname } from "~/i18n/helpers";
import { createTranslator } from "~/i18n/translator";

export default function NoEntry() {
	const { pathname } = useLocation();
	const locale = getValidLocaleFromPathname(pathname);
	const t = createTranslator(locale);

	return <p>{t("missing.translation")}</p>;
}
