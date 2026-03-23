import { useMatch } from "@solidjs/router";
import { type JSX, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { createTranslator } from "./translator";
import { SUPPORTED_LOCALES } from "./config";

type ProviderProps = { children: JSX.Element };

const initialI18nStore = {
	get t() {
		const match = useMatch(() => "/:locale?/*", {
			locale: SUPPORTED_LOCALES,
		});

		return createTranslator(match()?.params.project ?? null);
	},
};

export const I18nContext = createContext(initialI18nStore);

export function I18nProvider(props: ProviderProps) {
	const [i18n] = createStore(initialI18nStore);

	return (
		<I18nContext.Provider value={i18n}>{props.children}</I18nContext.Provider>
	);
}

export function useI18n() {
	const context = useContext(I18nContext);
	if (!context) {
		throw new Error("useI18n: must be used inside <I18nProvider />");
	}
	return context;
}
