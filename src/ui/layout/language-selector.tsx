import { Component, For, createSignal } from "solid-js";
import { DropdownMenu } from "@kobalte/core";
import { Icon } from "solid-heroicons";
import { language } from "solid-heroicons/solid";
import { A, useLocation } from "@solidjs/router";
import { languages } from "~/i18n/dictionaries";
import { getValidLocaleFromPathname } from "~/i18n/helpers";

const getLocalizedPath = ({
	selectedLanguage,
	langCode,
	pathname,
}: {
	selectedLanguage: string;
	langCode: string;
	pathname: string;
}): string => {
	if (selectedLanguage === langCode) return pathname;

	const newPath =
		selectedLanguage === "en"
			? `/${langCode}${pathname}`
			: langCode === "en"
				? pathname.replace(`/${selectedLanguage}`, "")
				: pathname.replace(selectedLanguage, langCode);
	return newPath;
};

const languageEntries = Object.entries(languages);

export const LanguageSelector: Component = () => {
	const location = useLocation();
	const selectedLanguage =
		getValidLocaleFromPathname(location.pathname) ?? "en";

	return (
		<DropdownMenu.Root gutter={10}>
			<DropdownMenu.Trigger class=" w-[4.5rem] flex h-6 items-center text-left rounded-lg shadow-md shadow-black/5 ring-1 ring-black/10 dark:bg-slate-800 dark:ring-inset dark:ring-white/60">
				<Icon
					class="w-4 pl-1 fill-slate-700 dark:fill-slate-200"
					path={language}
				/>
				<span class="truncate pl-1 w-16 text-slate-700 dark:text-slate-300 prose prose-slate text-sm ">
					{selectedLanguage === "en"
						? languages[selectedLanguage]
						: selectedLanguage.toUpperCase()}
				</span>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content class="z-50 w-44 space-y-1 rounded-xl bg-white p-2 text-sm shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
					<For each={languageEntries}>
						{([langCode, lang]) => (
							<A
								target="_self"
								href={getLocalizedPath({
									selectedLanguage,
									langCode,
									pathname: location.pathname,
								})}
								class="flex cursor-pointer select-none items-center rounded-[0.625rem] p-1 hover:bg-slate-200 hover:dark:bg-slate-600 group"
								classList={{
									"bg-slate-200 dark:bg-slate-700 font-medium":
										langCode === selectedLanguage,
								}}
							>
								<span class="pl-1 text-slate-700 dark:text-slate-300 prose prose-slate text-sm group-hover:dark:text-white">
									{lang}
								</span>
							</A>
						)}
					</For>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
