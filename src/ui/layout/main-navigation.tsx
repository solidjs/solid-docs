// @refresh reload

import { AnchorProps, useMatch } from "@solidjs/router";
import { For, Show, Suspense, createResource } from "solid-js";
import { useLocation } from "@solidjs/router";
import { Collapsible, Tabs } from "@kobalte/core";
import englishNav from "solid:collection/tree";
import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";
import { setIsOpen } from "./mobile-navigation";
import { A } from "~/ui/i18n-anchor";
import { SUPPORTED_LOCALES } from "~/i18n/config";
import { createTranslator } from "~/i18n/translator";
import {
	getLocaleFromPathname,
	getValidLocaleFromPathname,
	isValidLocale,
} from "~/i18n/helpers";
import { Dynamic } from "solid-js/web";

type Entry = {
	title: string;
	path: string;
	children?: Entry[];
	mainNavExclude: boolean;
	isTranslated?: boolean;
};

// passing to the Dynamic component
// to prevent stale show issue
const HtmlAnchor = (props: any) => <a {...props} />;

function ListItemLink(props: { item: Entry }) {
	if (props.item.mainNavExclude) return null;
	const location = useLocation();
	const linkStyles = () =>
		location.pathname === props.item.path.replace(/\\/g, "/")
			? "font-semibold text-blue-800 before:bg-blue-700 dark:before:bg-blue-200 dark:text-blue-300 before:block"
			: "text-slate-500 before:hidden before:bg-blue-600 before:dark:bg-blue-200 hover:text-blue-500 hover:font-bold hover:before:block dark:text-slate-300 ";
	return (
		<li class="relative">
			<Dynamic
				component={props.item.isTranslated ? A : HtmlAnchor}
				onClick={() => setIsOpen(false)}
				href={props.item.path}
				class={`block w-full lg:text-sm pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full ${linkStyles()}`}
			>
				{props.item.title}
				<Show when={!props.item.isTranslated}>
					<span>
						<abbr
							title="english"
							class="text-[0.7em] relative -top-2 left-2 no-underline  text-neutral-400 "
						>
							EN
						</abbr>
					</span>
				</Show>
			</Dynamic>
		</li>
	);
}

function DirList(props: { list: Entry[] }) {
	return (
		<For each={props.list}>
			{(item) => {
				if (Array.isArray(item.children)) {
					return (
						<li>
							<span class="font-display font-semibold text-slate-700 dark:text-slate-100 lg:text-sm">
								{item.title}
							</span>
							<ul
								role="list"
								class="ml-2 mt-2 space-y-2 border-l-2 border-slate-400 dark:border-slate-700 lg:mt-4 lg:space-y-4 lg:border-slate-400"
							>
								<For each={item.children}>
									{(child) =>
										Array.isArray(child.children) ? (
											<>
												<li>
													<Collapsible.Root defaultOpen={true}>
														<Collapsible.Trigger class="relative flex justify-between hover:cursor-pointer w-full pl-3.5 dark:text-slate-300 lg:text-sm group">
															<span class="font-display font-semibold dark:text-slate-100 lg:text-sm">
																{child.title}
															</span>
															<Icon
																path={chevronDown}
																class="h-4 my-auto transition-transform  kb-group-closed:rotate-180"
															/>
														</Collapsible.Trigger>
														<Collapsible.Content class="navigation_collapsible">
															<ul
																role="list"
																class="ml-4 mt-2 space-y-2 border-l-2 border-slate-400 dark:border-slate-700 lg:mt-4 lg:space-y-3 dark:lg:border-slate-700 text-base lg:text-sm"
															>
																<DirList list={child.children} />
															</ul>
														</Collapsible.Content>
													</Collapsible.Root>
												</li>
											</>
										) : (
											<ListItemLink item={child} />
										)
									}
								</For>
							</ul>
						</li>
					);
				} else {
					return <ListItemLink item={item} />;
				}
			}}
		</For>
	);
}

export function MainNavigation() {
	const { pathname } = useLocation();

	const [entries] = createResource(
		() => getLocaleFromPathname(pathname),
		async (locale) => {
			"use server";

			if (SUPPORTED_LOCALES.some((lang) => lang === locale)) {
				return (await import(`../../../.solid/tree-${locale}.ts`)).default;
			}

			return englishNav;
		}
	);

	const translate = createTranslator(getValidLocaleFromPathname(pathname));

	const learn = () => entries()?.learn;
	const reference = () => entries()?.reference;

	const isReference = useMatch(() => "/reference/*");

	return (
		<Suspense>
			<Show when={translate}>
				{(t) => (
					<>
						<nav class="overflow-y-auto custom-scrollbar h-full md:h-[calc(100vh-7rem)] pb-20">
							<Tabs.Root defaultValue={isReference() ? "reference" : "learn"}>
								<Tabs.List class="sticky top-0 flex w-full pb-4 pr-4 z-10 md:dark:bg-slate-900 md:bg-slate-50">
									<Tabs.Trigger
										value="learn"
										class="inline-block flex-1 ml-2 px-6 py-2 outline-none hover:bg-blue-500/30 dark:hover:bg-blue-300/20  dark:focus-visible:bg-blue-800 dark:text-slate-100 hover:font-bold"
									>
										{t()("main.nav.tab.learn")}
									</Tabs.Trigger>
									<Tabs.Trigger
										value="reference"
										class="inline-block flex-1 px-6 py-2 hover:bg-blue-500/30 dark:hover:bg-blue-300/20  dark:focus-visible:bg-blue-800 dark:text-slate-100 hover:font-bold"
									>
										{t()("main.nav.tab.reference")}
									</Tabs.Trigger>
									<Tabs.Indicator class="absolute bottom-4 bg-blue-500 dark:bg-blue-500 transition-all duration-250 h-[2px]" />
								</Tabs.List>
								<Tabs.Content
									value="learn"
									class="w-full relative mt-8 text-base"
								>
									<Show
										when={learn()}
										fallback={
											<p class="text-white">{t()("main.nav.no.routes")}</p>
										}
									>
										{(learnList) => (
											<ul role="list" class="space-y-6 px-4">
												<DirList list={learnList()} />
											</ul>
										)}
									</Show>
								</Tabs.Content>
								<Tabs.Content value="reference" class="w-full relative top-8">
									<Show
										when={reference()}
										fallback={<p>{t()("main.nav.no.routes")}</p>}
									>
										{(referenceList) => (
											<ul role="list" class="space-y-6 px-4">
												<DirList list={referenceList()} />
											</ul>
										)}
									</Show>
								</Tabs.Content>
							</Tabs.Root>
						</nav>
					</>
				)}
			</Show>
		</Suspense>
	);
}
