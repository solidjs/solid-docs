import { dictionaries } from "./dictionaries";
import { SUPPORTED_LOCALES } from "./config";

export function createTranslator(
	locale: (typeof SUPPORTED_LOCALES)[number] | null
) {
	// type overlap will only be 100% when translations are done
	// so we're fine with `dictionaries[locale][key]` being implicit `any`
	// @ts-expect-error: expected any here
	const dictionary = dictionaries[locale || "default"];
	return (key: keyof (typeof dictionaries)["default"]) => {
		return dictionary[key] || dictionaries["default"][key];
	};
}
