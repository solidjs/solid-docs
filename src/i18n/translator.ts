import { dictionaries } from "./dictionaries";
import { SUPPORTED_LOCALES } from "./config";

export function createTranslator(
	locale: (typeof SUPPORTED_LOCALES)[number] | null
) {
	const dictionary = dictionaries[locale || "default"];
	return (key: keyof (typeof dictionaries)["default"]) => {
		// type overlap will only be 100% when translations are done
		// so we're fine with `dictionaries[locale][key]` being implicit `any`
		// @ts-ignore
		return dictionary[key] || dictionaries["default"][key];
	};
}
