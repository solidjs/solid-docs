import english from "./en/ui";
import ptbr from "./pt-br/ui";
import es from "./es/ui";

export const dictionaries = {
	default: english,
	// "pt-br": ptbr,
	// es,
};

export const languages: { [key: string]: string } = {
	en: "English",
	// "pt-br": "Português do Brasil",
	// es: "Español",
};
