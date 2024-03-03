import { useI18n } from "~/i18n/i18n-context";

export default function NoEntry() {
	const i18n = useI18n();

	return <p>{i18n.t("missing.translation")}</p>;
}
