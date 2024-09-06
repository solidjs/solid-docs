import { OramaClient } from "@oramacloud/client";
import { createEffect, createSignal, Show, For, Suspense, startTransition, onCleanup, createMemo } from "solid-js";
import { Dialog } from "@kobalte/core/dialog";
import { A, createAsync, useNavigate, usePreloadRoute } from "@solidjs/router";
import { createList } from "solid-list";
import { createMarker, makeSearchRegex } from "@solid-primitives/marker";

const client = new OramaClient({
	endpoint: import.meta.env.VITE_ORAMA_ENDPOINT,
	api_key: import.meta.env.VITE_ORAMA_API_KEY,
});

type OramaResult = {
  hits: {
    document: OramaDocument;
  }[];
}

type OramaDocument = {
  content: string;
  path: string;
  section: string;
  title: string;
}

export function Search() {
	const navigate = useNavigate();
	const preload = usePreloadRoute();
	const [open, setOpen] = createSignal(false);
	const [searchTerm, setSearchTerm] = createSignal("");
	const [resultRefs, setResultRefs] = createSignal<HTMLElement[]>([]);

	const result = createAsync(async () => {
		const _searchTerm = searchTerm();
		if (!_searchTerm) return {};
		const result: OramaResult | null  = await client.search({
			term: _searchTerm,
			mode: "fulltext",
		});
		if (!result) return {};
		const groupedHits = result.hits.reduce((groupedHits, hit) => {
			const section = hit.document.section.replace(/(^|-)([a-z])/g, (_, sep, letter) => sep + letter.toUpperCase());
			if (!groupedHits[section]) {
				groupedHits[section] = [];
			}
			groupedHits[section].push(hit);
			return groupedHits;
		}, {} as Record<string, OramaResult["hits"]>);
		setActive(0);
		setResultRefs([]);
		return groupedHits;
	}, { initialValue: {} });

	const resultArray = () =>  Object.values(result()).flatMap(hits => hits);

	const { active, setActive, onKeyDown } = createList({
		items: () =>
			[
				...Array(
					Object.values(result()).flatMap(hits => hits).length,
				).keys(),
			],
		initialActive: 0,
		handleTab: false,
	});

	createEffect(() => {
		const _active = active();
		if (_active === null) return;
		const ref = resultRefs()[_active];
		if (ref) ref.scrollIntoView({ block: "nearest" });
		const path = resultArray()[_active]?.document.path;
		if (!path) return;
		preload(new URL(path, "https://docs.solidjs.com"), { preloadData: true });
	});

	createEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.metaKey && e.key === "k") {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		onCleanup(() => {
			window.removeEventListener("keydown", handleKeyDown);
		});
	});

	const regex = createMemo(() => makeSearchRegex(searchTerm()));
	const highlightTitle = createMarker(text => <mark class="font-bold bg-transparent dark:text-white">{text()}</mark>);
	const highlightContent = createMarker(text => <mark class="rounded bg-blue-200 dark:bg-slate-600 dark:text-white px-0.5">{text()}</mark>);
	const trimContent = (content: string) => trimText(content, searchTerm(), 5);

	return (
		<Dialog open={open()} onOpenChange={(open) => {
			if (!open) {
				setSearchTerm("");
			}
			setOpen(open);
		}}>
			<Dialog.Trigger class="items-center rounded-lg md:border border-black/10 dark:border-white/60 dark:bg-slate-800 md:px-2 md:py-1.5 flex">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 256 256"
					class="size-6 md:size-4"
				>
					<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
				</svg>
				<span class="hidden md:block ml-1 text-sm">Search</span>
				<kbd class="hidden md:block ml-2 min-w-6 rounded border border-black/5 px-1 pb-px pt-1 text-center font-mono text-xs dark:bg-slate-700">
					<span>⌘</span>
					<span class="ml-0.5">K</span>
				</kbd>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay class="fixed inset-0 z-50 bg-black/50" />
				<Dialog.Content class="fixed inset-0 flex flex-col lg:top-14 z-50 lg:bottom-auto lg:max-h-[calc(100%-56px-56px)] w-full lg:left-1/2 lg:max-w-[550px] lg:-translate-x-1/2 overflow-hidden lg:rounded-2xl border border-black/5 bg-white pt-4 dark:border-white/60 dark:bg-slate-800">
					<div class="flex mr-4 lg:mx-4 items-center">
						<Dialog.CloseButton
							tabIndex={-1}
							class="px-4 lg:hidden py-3"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" class="size-5"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z" /></svg>
						</Dialog.CloseButton>
						<div class="relative grow">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 256 256"
								class="absolute inset-y-0 my-auto ml-3 left-0 size-5"
							>
								<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
							</svg>

							<input
								placeholder="Search docs"
								aria-label="Search docs"
								role="searchbox"
								spellcheck={false}
								value={searchTerm()}
								class="px-9 w-full rounded border border-blue-100 bg-white dark:bg-slate-800 py-2 ring-2 ring-blue-400 focus-visible:border focus-visible:border-blue-400 focus-visible:ring-2 focus:outline-none"
								onInput={(e) =>
									startTransition(() =>
										setSearchTerm((e.target as HTMLInputElement).value)
									)
								}
								onFocus={() => setActive(0)}
								onBlur={() => setActive(null)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										navigate(resultArray()[active()!].document.path);
										setOpen(false);
										setSearchTerm("");
										return;
									}
									onKeyDown(e);
								}}
							/>
							<Show when={searchTerm()}>
								<button
									class="absolute inset-y-0 right-0 p-2"
									onClick={() => setSearchTerm("")}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 256 256"
										class="size-4"
									>
										<path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" />
									</svg>
								</button>
							</Show>
						</div>
					</div>
					<div class="mt-1 lg:grow space-y-2 overflow-y-auto px-4 py-2 scrollbar-thin">
						<Suspense>
							<Show
								when={
									searchTerm() &&
                    Object.keys(result()).length === 0
								}
							>
								<p class="mt-2 text-center text-sm">
            No results for "<span class="font-bold">{searchTerm()}</span>"
								</p>
								<p class="!mb-3 !mt-4 text-center text-sm">
            Believe this query should return results?{" "}
									<A
										href={`https://github.com/solidjs/solid-docs-next/issues/new?title=[Search]+Missing+results+for+query+%22${encodeURIComponent(searchTerm())}%22`}
										target="_blank"
										class="text-blue-400 font-bold"
									>
              Let us know
									</A>
            .
								</p>
							</Show>
							<For each={Object.entries(result())}>
								{([section, hits]) => (
									<section>
										<p class="pl-2 pt-2 text-sm text-black/70 dark:text-white/70">{section}</p>
										<ul role="listbox">
											<For each={hits}>
												{(hit) => {
													const itemIndex = Object.values(result())
														.flatMap((items) => items)
														.findIndex((i) => i === hit);

													return (
														<li ref={ref => setResultRefs(resultRefs => {
															const newRefs = [...resultRefs];
															newRefs[itemIndex] = ref;
															return newRefs;
														})} role="option" aria-selected={itemIndex === active() ? "true" : "false"} class="scroll-my-1.5">
															<Dialog.CloseButton
																as={A}
																href={hit.document.path}
																classList={{"pl-4 rounded-md block p-2 text-sm": true,
																	"bg-blue-100 dark:bg-slate-700": itemIndex === active(),
																}}
																onMouseMove={() => setActive(itemIndex)}
															>
																<span class="block">{highlightTitle(hit.document.title, regex())}</span>
																<span
																	class="block text-black/70 dark:text-white/70 truncate"
																>{highlightContent(trimContent(hit.document.content), regex())}</span>
															</Dialog.CloseButton>
														</li>
													);}
												}
											</For>
										</ul>
									</section>
								)}
							</For>
						</Suspense>
					</div>
					<div class="px-4 justify-center lg:justify-between items-center border-t border-black/10 dark:border-slate-700 pt-2 pb-3 text-sm flex">
						<div class="hidden lg:block">
							<KeyboardShortcut key="↩" />
							<span class="ml-1">to select</span>
							<KeyboardShortcut key="↑/↓" class="ml-3" />
							<span class="ml-1">to navigate</span>
							<KeyboardShortcut key="esc" class="ml-3" />
							<span class="ml-1">to close</span>
						</div>
						<div>
							<A href="https://askorama.ai/?utm_source=docs.solidjs.com" target="_blank" class="inline-flex items-center space-x-1">
								<span>Powered by</span>
								<svg aria-label="Orama" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 4053 1000" class="dark:hidden h-[18px]"><g clip-path="url(#a)"><path fill="#302F33" d="M3780.21 720.75c73.6 0 142.18-30.108 153.05-76.943 3.35 30.108 20.07 52.689 44.33 64.398 21.74 10.872 48.51 12.545 74.43 2.509v-75.27c-10.87 2.509-22.58 3.345-31.78-4.182-9.2-7.527-15.89-24.254-15.89-55.198V428.032c0-91.161-68.58-148.032-188.17-148.032-103.71 0-182.33 42.653-192.36 107.051l80.29 23.418c6.69-32.617 45.99-55.199 107.05-55.199 58.54 0 104.54 19.236 104.54 51.017 0 30.108-41.82 44.326-145.52 51.853-98.69 7.527-158.91 55.198-158.91 132.141 0 76.107 59.38 130.469 168.94 130.469Zm0-74.434c-49.34 0-79.45-20.908-79.45-55.198 0-32.618 28.44-55.199 74.43-58.544 77.78-5.018 125.46-14.218 141.35-32.617 0 88.652-56.88 146.359-136.33 146.359ZM3358.14 282.79c-64.86 0-123.48 30.584-152.39 77.637-22.67-49.405-74.25-76.853-129.74-77.637-55.48 0-102.37 28.231-127.38 72.932v-61.169h-84.41v415.328h85.97V482.764c0-72.147 43.77-119.2 106.29-119.2 59.39 0 96.9 43.916 96.9 116.848v229.469h85.97V481.196c0-71.364 42.99-117.632 105.51-117.632 58.61 0 96.12 40.779 96.12 115.279v231.038h85.97V464.727c0-55.679-15.63-100.379-46.89-132.532-30.48-32.937-71.12-49.405-121.92-49.405ZM1420.97 720.75c133.82 0 224.14-90.324 224.14-223.302 0-132.142-88.65-216.612-224.14-216.612-135.48 0-224.97 85.307-224.97 216.612 0 132.978 92 223.302 224.97 223.302Zm0-80.288c-80.28 0-135.48-59.38-135.48-143.014 0-82.798 53.52-136.323 135.48-136.323 82.8 0 134.66 53.525 134.66 136.323 0 84.47-54.37 143.014-134.66 143.014ZM2040.54 280c-69.41 0-128.79 28.435-165.59 76.107v-70.253h-127.12v72.762h125.45c-25.09 33.453-39.31 76.106-39.31 125.45v153.05h-83.63v72.762h282.68v-72.762h-108.73V481.557c0-66.907 51.02-117.087 116.25-117.087 52.69 0 86.98 34.29 97.02 76.943l81.96-29.272C2201.96 332.689 2135.05 280 2040.54 280ZM2484.85 720.75c73.6 0 142.18-30.108 153.05-76.943 3.34 30.108 20.07 52.689 44.32 64.398 21.75 10.872 48.51 12.545 74.44 2.509v-75.27c-10.87 2.509-22.58 3.345-31.78-4.182-9.2-7.527-15.89-24.254-15.89-55.198V428.032c0-91.161-68.58-148.032-188.18-148.032-103.7 0-182.32 42.653-192.36 107.051l80.29 23.418c6.69-32.617 46-55.199 107.05-55.199 58.55 0 104.55 19.236 104.55 51.017 0 30.108-41.82 44.326-145.53 51.853-98.69 7.527-158.9 55.198-158.9 132.141 0 76.107 59.38 130.469 168.94 130.469Zm0-74.434c-49.35 0-79.45-20.908-79.45-55.198 0-32.618 28.43-55.199 74.43-58.544 77.78-5.018 125.45-14.218 141.34-32.617 0 88.652-56.87 146.359-136.32 146.359Z"/><g clip-path="url(#b)"><path fill="#FB81B8" d="M886.945 188.609a485.52 485.52 0 0 0-23.614-29.38l.444 12.057 8.315 17.877 14.855-.554Z"/><path fill="url(#c)" fill-rule="evenodd" d="M504.709 255.392c36.478-32.395 86.925-48.774 135.678-46.523 27.846 1.285 52.822 8.425 73.387 20.257 17.762 9.53 35.593 27.014 50.276 47.469 25.881 22.594 64.781 25.377 93.967 4.55 34.122-24.35 42.045-71.752 17.696-105.875-55.187-77.34-142.802-114.1-228.326-118.048-85.422-3.943-175.881 24.162-244.392 85.476-.23.206-.459.414-.686.622-135.652 121.93-147.208 330.867-25.424 466.956 27.955 31.238 75.939 33.899 107.176 5.944 31.237-27.956 33.897-75.942 5.943-107.18-66.004-73.756-59.662-187.139 14.134-253.132.191-.171.381-.343.571-.516Z" clip-rule="evenodd"/><mask id="e" width="598" height="580" x="292" y="56" maskUnits="userSpaceOnUse" style={{"mask-type":"alpha"}}><path fill="url(#d)" fill-rule="evenodd" d="M504.731 255.373c36.476-32.383 86.913-48.755 135.658-46.505 27.845 1.285 52.821 8.425 73.386 20.257 17.762 9.53 35.593 27.014 50.276 47.469 25.881 22.594 64.781 25.378 93.967 4.55 34.122-24.35 42.045-71.752 17.696-105.875-55.187-77.34-142.802-114.1-228.326-118.048-85.422-3.943-175.881 24.162-244.392 85.476-.24.215-.478.431-.715.648-135.625 121.934-147.171 330.852-25.395 466.931 27.954 31.238 75.938 33.899 107.175 5.944 31.237-27.956 33.898-75.942 5.943-107.18-66.003-73.756-59.662-187.139 14.134-253.132.199-.178.396-.356.593-.535Z" clip-rule="evenodd"/></mask><g mask="url(#e)"><path fill="url(#f)" d="m407.426 80.439-257.853 252.15 471.195 73.248 189.63-148.885v-99.868L407.426 80.439Z" style={{"mix-blend-mode":"multiply"}}/></g><path fill="url(#g)" fill-rule="evenodd" d="M273.468 135.438c27.943 31.249 25.263 79.234-5.985 107.177-142.84 127.734-155.079 347.036-27.342 489.891 27.942 31.249 25.262 79.234-5.986 107.177-31.248 27.943-79.231 25.263-107.173-5.986C-56.631 628.353-39.05 313.08 166.295 129.452c31.248-27.943 79.231-25.263 107.173 5.986Z" clip-rule="evenodd"/><path fill="url(#h)" fill-rule="evenodd" d="M132.968 726.521c31.248-27.943 79.231-25.263 107.173 5.986C367.87 875.353 587.165 887.591 730.014 759.85c31.248-27.943 79.231-25.263 107.173 5.986 27.942 31.249 25.262 79.234-5.986 107.177-205.336 183.617-520.598 166.037-704.219-39.315-27.942-31.249-25.262-79.234 5.986-107.177Z" clip-rule="evenodd"/><path fill="url(#i)" fill-rule="evenodd" d="M817.382 216.307c36.217-21.108 82.688-8.858 103.795 27.36 115.123 197.541 92.223 466.428-89.902 629.328-31.244 27.948-79.227 25.274-107.173-5.972-27.946-31.246-25.273-79.231 5.972-107.178 122.505-109.577 142.893-297.413 59.949-439.739-21.107-36.218-8.858-82.691 27.359-103.799Z" clip-rule="evenodd"/><mask id="k" width="288" height="688" x="704" y="205" maskUnits="userSpaceOnUse" style={{"mask-type":"alpha"}}><path fill="url(#j)" fill-rule="evenodd" d="M817.382 216.307c36.217-21.108 82.688-8.859 103.795 27.36 115.123 197.54 92.223 466.427-89.902 629.328-31.244 27.947-79.227 25.273-107.173-5.973-27.946-31.245-25.273-79.23 5.972-107.177 122.505-109.578 142.893-297.414 59.949-439.74-21.107-36.218-8.858-82.69 27.359-103.798Z" clip-rule="evenodd"/></mask><g mask="url(#k)"><path fill="url(#l)" d="M787.171 527.842 533.284 792.631l372.153 105.907L1065 514.67 854.752 57.415l-18.773 381.987-48.808 88.44Z" style={{"mix-blend-mode":"multiply"}}/></g><path fill="#F97CBF" fill-rule="evenodd" d="m832.644 128.021 22.19 24.558 22.255 24.558c-.55-.824-1.136-1.677-1.755-2.554l2.048 2.198c-.921-1.217-2.62-3.339-4.877-6.067-10.157-13.475-26.335-31.02-39.861-42.693Z" clip-rule="evenodd"/><path fill="url(#m)" fill-rule="evenodd" d="M382.919 503.08c31.247-27.943 79.23-25.264 107.173 5.985 65.99 73.799 179.369 80.141 253.122 14.134 31.237-27.955 79.221-25.294 107.176 5.944 27.954 31.238 25.293 79.224-5.943 107.18-136.298 121.98-345.67 110.195-467.513-26.065-27.942-31.249-25.263-79.234 5.985-107.178Z" clip-rule="evenodd"/><path fill="url(#n)" fill-rule="evenodd" d="M870.494 168.74c-27.954-31.238-75.938-33.899-107.175-5.944-27.05 24.208-32.671 63.437-15.539 93.804 9.421 10.174 18.178 21.885 25.669 34.2 48.241 72.967 36.944 172.257-30.207 232.308-31.248 27.943-33.927 75.928-5.985 107.177 27.943 31.249 75.926 33.929 107.173 5.985 136.256-121.847 148.04-331.227 26.064-467.53Z" clip-rule="evenodd"/><path fill="url(#o)" fill-rule="evenodd" d="M741.442 250.089C634.37 124.866 409.641 115.57 267.487 242.69c-31.248 27.943-79.231 25.263-107.174-5.986-27.942-31.249-25.262-79.234 5.986-107.177C367.108-50.045 710.265-50.049 875.122 174.519c24.807 33.792 17.524 81.296-16.267 106.104-29.143 21.396-68.485 18.921-94.67-3.842-6.981-9.747-14.678-18.823-22.743-26.692Z" clip-rule="evenodd"/></g></g><defs><linearGradient id="c" x1="412.101" x2="463.265" y1="502.363" y2="173.461" gradientUnits="userSpaceOnUse"><stop stop-color="#F6D25B"/><stop offset="1" stop-color="#F8B580"/></linearGradient><linearGradient id="d" x1="412.102" x2="463.266" y1="502.363" y2="173.46" gradientUnits="userSpaceOnUse"><stop stop-color="#F6D25B"/><stop offset="1" stop-color="#F8B580"/></linearGradient><linearGradient id="f" x1="641.4" x2="346.724" y1="18.414" y2="358.578" gradientUnits="userSpaceOnUse"><stop stop-color="#895200"/><stop offset=".833" stop-color="#E28800" stop-opacity="0"/></linearGradient><linearGradient id="g" x1="146.395" x2="182.872" y1="186.033" y2="719.825" gradientUnits="userSpaceOnUse"><stop stop-color="#ED51F2"/><stop offset="1" stop-color="#B771F2"/></linearGradient><linearGradient id="h" x1="145.334" x2="711.325" y1="750.869" y2="784.954" gradientUnits="userSpaceOnUse"><stop stop-color="#B971F3"/><stop offset="1" stop-color="#8F6FDE"/></linearGradient><linearGradient id="i" x1="850.621" x2="762.953" y1="326.396" y2="845.166" gradientUnits="userSpaceOnUse"><stop stop-color="#6A4BB2"/><stop offset="1" stop-color="#9170E0"/></linearGradient><linearGradient id="j" x1="850.621" x2="748.292" y1="279.436" y2="838.57" gradientUnits="userSpaceOnUse"><stop stop-color="#6A4BB2"/><stop offset="1" stop-color="#9170E0"/></linearGradient><linearGradient id="l" x1="725.222" x2="857.14" y1="493.971" y2="772.221" gradientUnits="userSpaceOnUse"><stop stop-color="#542DA7"/><stop offset=".833" stop-color="#5F2EAF" stop-opacity="0"/></linearGradient><linearGradient id="m" x1="452.299" x2="711.758" y1="506.015" y2="579.099" gradientUnits="userSpaceOnUse"><stop stop-color="#F6D25B"/><stop offset="1" stop-color="#F9A38F"/></linearGradient><linearGradient id="n" x1="825.466" x2="836.377" y1="303.379" y2="579.688" gradientUnits="userSpaceOnUse"><stop stop-color="#FA80B7"/><stop offset="1" stop-color="#F8A48D"/></linearGradient><linearGradient id="o" x1="236.692" x2="795.806" y1="166.152" y2="195.386" gradientUnits="userSpaceOnUse"><stop stop-color="#E755F3"/><stop offset="1" stop-color="#F97FB6"/></linearGradient><clipPath id="a"><path fill="#fff" d="M0 0h4053v1000H0z"/></clipPath><clipPath id="b"><path fill="#fff" d="M0 0h991.962v1000H0z"/></clipPath></defs></svg>
								<svg aria-label="Orama" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 4053 1000" class="hidden dark:block h-[18px]"><g clip-path="url(#a-dark)"><path fill="#EFEDF0" d="M3780.21 720.75c73.6 0 142.18-30.108 153.05-76.943 3.35 30.108 20.07 52.689 44.33 64.398 21.74 10.872 48.51 12.545 74.43 2.509v-75.27c-10.87 2.509-22.58 3.345-31.78-4.182-9.2-7.527-15.89-24.254-15.89-55.198V428.032c0-91.161-68.58-148.032-188.17-148.032-103.71 0-182.33 42.653-192.36 107.051l80.29 23.418c6.69-32.617 45.99-55.199 107.05-55.199 58.54 0 104.54 19.236 104.54 51.017 0 30.108-41.82 44.326-145.52 51.853-98.69 7.527-158.91 55.198-158.91 132.141 0 76.107 59.38 130.469 168.94 130.469Zm0-74.434c-49.34 0-79.45-20.908-79.45-55.198 0-32.618 28.44-55.199 74.43-58.544 77.78-5.018 125.46-14.218 141.35-32.617 0 88.652-56.88 146.359-136.33 146.359ZM3358.14 282.79c-64.86 0-123.48 30.584-152.39 77.637-22.67-49.405-74.25-76.853-129.74-77.637-55.48 0-102.37 28.232-127.38 72.932v-61.169h-84.41v415.328h85.97V482.764c0-72.147 43.77-119.2 106.29-119.2 59.39 0 96.9 43.916 96.9 116.848v229.469h85.97V481.196c0-71.364 42.99-117.632 105.51-117.632 58.61 0 96.12 40.779 96.12 115.279v231.038h85.97V464.727c0-55.679-15.63-100.379-46.89-132.532-30.48-32.937-71.12-49.405-121.92-49.405ZM1420.97 720.75c133.82 0 224.14-90.324 224.14-223.302 0-132.142-88.65-216.612-224.14-216.612-135.48 0-224.97 85.307-224.97 216.612 0 132.978 92 223.302 224.97 223.302Zm0-80.288c-80.28 0-135.48-59.38-135.48-143.014 0-82.798 53.52-136.323 135.48-136.323 82.8 0 134.66 53.525 134.66 136.323 0 84.47-54.37 143.014-134.66 143.014ZM2040.54 280c-69.41 0-128.79 28.435-165.59 76.107v-70.253h-127.12v72.762h125.45c-25.09 33.453-39.31 76.106-39.31 125.45v153.05h-83.63v72.762h282.68v-72.762h-108.73V481.557c0-66.907 51.02-117.087 116.25-117.087 52.69 0 86.98 34.29 97.02 76.943l81.96-29.272C2201.96 332.689 2135.05 280 2040.54 280ZM2484.85 720.75c73.6 0 142.18-30.108 153.05-76.943 3.34 30.108 20.07 52.689 44.32 64.398 21.75 10.872 48.51 12.545 74.44 2.509v-75.27c-10.87 2.509-22.58 3.345-31.78-4.182-9.2-7.527-15.89-24.254-15.89-55.198V428.032c0-91.161-68.58-148.032-188.18-148.032-103.7 0-182.32 42.653-192.36 107.051l80.29 23.418c6.69-32.617 46-55.199 107.05-55.199 58.55 0 104.55 19.236 104.55 51.017 0 30.108-41.82 44.326-145.53 51.853-98.69 7.527-158.9 55.198-158.9 132.141 0 76.107 59.38 130.469 168.94 130.469Zm0-74.434c-49.35 0-79.45-20.908-79.45-55.198 0-32.618 28.43-55.199 74.43-58.544 77.78-5.018 125.45-14.218 141.34-32.617 0 88.652-56.87 146.359-136.32 146.359Z"/><g clip-path="url(#b-dark)"><path fill="#FB81B8" d="M886.945 188.609a485.52 485.52 0 0 0-23.614-29.38l.444 12.057 8.315 17.877 14.855-.554Z"/><path fill="url(#c-dark)" fill-rule="evenodd" d="M504.709 255.392c36.478-32.395 86.925-48.774 135.678-46.523 27.846 1.285 52.822 8.425 73.387 20.257 17.762 9.53 35.593 27.014 50.276 47.469 25.881 22.594 64.781 25.377 93.967 4.55 34.122-24.35 42.045-71.752 17.696-105.875-55.187-77.34-142.802-114.1-228.326-118.048-85.422-3.943-175.881 24.162-244.392 85.476-.23.206-.459.414-.686.622-135.652 121.93-147.208 330.867-25.424 466.956 27.955 31.238 75.939 33.899 107.176 5.944 31.237-27.956 33.897-75.942 5.943-107.18-66.004-73.756-59.662-187.139 14.134-253.132.191-.171.381-.343.571-.516Z" clip-rule="evenodd"/><mask id="e-dark" width="598" height="580" x="292" y="56" maskUnits="userSpaceOnUse" style={{"mask-type":"alpha"}}><path fill="url(#d-dark)" fill-rule="evenodd" d="M504.731 255.373c36.476-32.383 86.913-48.755 135.658-46.505 27.845 1.285 52.821 8.425 73.386 20.258 17.762 9.529 35.593 27.013 50.276 47.468 25.881 22.594 64.781 25.378 93.967 4.55 34.122-24.35 42.045-71.752 17.696-105.875-55.187-77.34-142.802-114.1-228.326-118.047-85.422-3.944-175.881 24.161-244.392 85.475-.24.215-.478.431-.715.648-135.625 121.934-147.171 330.852-25.395 466.931 27.954 31.238 75.938 33.899 107.175 5.944 31.237-27.956 33.898-75.942 5.943-107.18-66.003-73.756-59.662-187.139 14.134-253.132.199-.178.396-.356.593-.535Z" clip-rule="evenodd"/></mask><g mask="url(#e-dark)"><path fill="url(#f-dark)" d="m407.426 80.439-257.853 252.15 471.195 73.248 189.63-148.885v-99.868L407.426 80.439Z" style={{"mix-blend-mode":"multiply"}}/></g><path fill="url(#g-dark)" fill-rule="evenodd" d="M273.468 135.438c27.943 31.249 25.263 79.234-5.985 107.177-142.84 127.733-155.079 347.036-27.342 489.891 27.942 31.249 25.262 79.234-5.986 107.177-31.248 27.943-79.231 25.263-107.173-5.986C-56.631 628.353-39.05 313.08 166.295 129.452c31.248-27.943 79.231-25.263 107.173 5.986Z" clip-rule="evenodd"/><path fill="url(#h-dark)" fill-rule="evenodd" d="M132.968 726.521c31.248-27.943 79.231-25.263 107.173 5.986C367.87 875.353 587.165 887.591 730.014 759.85c31.248-27.943 79.231-25.263 107.173 5.986 27.942 31.249 25.262 79.234-5.986 107.177-205.336 183.617-520.598 166.037-704.219-39.315-27.942-31.249-25.262-79.234 5.986-107.177Z" clip-rule="evenodd"/><path fill="url(#i-dark)" fill-rule="evenodd" d="M817.382 216.307c36.217-21.108 82.688-8.858 103.795 27.36 115.123 197.541 92.223 466.428-89.902 629.328-31.244 27.948-79.227 25.274-107.173-5.972-27.946-31.246-25.273-79.231 5.972-107.178 122.505-109.577 142.893-297.413 59.949-439.739-21.107-36.218-8.858-82.691 27.359-103.799Z" clip-rule="evenodd"/><mask id="k-dark" width="288" height="688" x="704" y="205" maskUnits="userSpaceOnUse" style={{"mask-type":"alpha"}}><path fill="url(#j-dark)" fill-rule="evenodd" d="M817.382 216.307c36.217-21.108 82.688-8.859 103.795 27.36 115.123 197.54 92.223 466.427-89.902 629.328-31.244 27.947-79.227 25.273-107.173-5.973-27.946-31.245-25.273-79.23 5.972-107.177 122.505-109.578 142.893-297.414 59.949-439.74-21.107-36.218-8.858-82.69 27.359-103.798Z" clip-rule="evenodd"/></mask><g mask="url(#k-dark)"><path fill="url(#l-dark)" d="M787.171 527.842 533.284 792.631l372.153 105.907L1065 514.67 854.752 57.415l-18.773 381.987-48.808 88.44Z" style={{"mix-blend-mode":"multiply"}}/></g><path fill="#F97CBF" fill-rule="evenodd" d="m832.644 128.021 22.19 24.558 22.255 24.558c-.55-.824-1.136-1.677-1.755-2.554l2.048 2.198c-.921-1.217-2.62-3.339-4.877-6.067-10.157-13.475-26.335-31.02-39.861-42.693Z" clip-rule="evenodd"/><path fill="url(#m-dark)" fill-rule="evenodd" d="M382.919 503.08c31.247-27.943 79.23-25.264 107.173 5.985 65.99 73.799 179.369 80.14 253.122 14.134 31.237-27.955 79.221-25.294 107.176 5.944 27.954 31.238 25.293 79.224-5.943 107.179-136.298 121.981-345.67 110.196-467.513-26.065-27.942-31.248-25.263-79.233 5.985-107.177Z" clip-rule="evenodd"/><path fill="url(#n-dark)" fill-rule="evenodd" d="M870.494 168.74c-27.954-31.238-75.938-33.899-107.175-5.944-27.05 24.208-32.671 63.437-15.539 93.803 9.421 10.175 18.178 21.885 25.669 34.201 48.241 72.967 36.944 172.257-30.207 232.308-31.248 27.943-33.927 75.928-5.985 107.177 27.943 31.249 75.926 33.929 107.173 5.985 136.256-121.847 148.04-331.228 26.064-467.53Z" clip-rule="evenodd"/><path fill="url(#o-dark)" fill-rule="evenodd" d="M741.442 250.089C634.37 124.866 409.641 115.57 267.487 242.69c-31.248 27.943-79.231 25.263-107.174-5.986-27.942-31.249-25.262-79.234 5.986-107.177C367.108-50.045 710.265-50.049 875.122 174.519c24.807 33.792 17.524 81.296-16.267 106.104-29.143 21.396-68.485 18.921-94.67-3.842-6.981-9.747-14.678-18.823-22.743-26.692Z" clip-rule="evenodd"/></g></g><defs><linearGradient id="c-dark" x1="412.101" x2="463.265" y1="502.363" y2="173.461" gradientUnits="userSpaceOnUse"><stop stop-color="#F6D25B"/><stop offset="1" stop-color="#F8B580"/></linearGradient><linearGradient id="d-dark" x1="412.102" x2="463.266" y1="502.363" y2="173.46" gradientUnits="userSpaceOnUse"><stop stop-color="#F6D25B"/><stop offset="1" stop-color="#F8B580"/></linearGradient><linearGradient id="f-dark" x1="641.4" x2="346.724" y1="18.414" y2="358.578" gradientUnits="userSpaceOnUse"><stop stop-color="#895200"/><stop offset=".833" stop-color="#E28800" stop-opacity="0"/></linearGradient><linearGradient id="g-dark" x1="146.395" x2="182.872" y1="186.033" y2="719.825" gradientUnits="userSpaceOnUse"><stop stop-color="#ED51F2"/><stop offset="1" stop-color="#B771F2"/></linearGradient><linearGradient id="h-dark" x1="145.334" x2="711.325" y1="750.869" y2="784.954" gradientUnits="userSpaceOnUse"><stop stop-color="#B971F3"/><stop offset="1" stop-color="#8F6FDE"/></linearGradient><linearGradient id="i-dark" x1="850.621" x2="762.953" y1="326.396" y2="845.166" gradientUnits="userSpaceOnUse"><stop stop-color="#6A4BB2"/><stop offset="1" stop-color="#9170E0"/></linearGradient><linearGradient id="j-dark" x1="850.621" x2="748.292" y1="279.436" y2="838.57" gradientUnits="userSpaceOnUse"><stop stop-color="#6A4BB2"/><stop offset="1" stop-color="#9170E0"/></linearGradient><linearGradient id="l-dark" x1="725.222" x2="857.14" y1="493.971" y2="772.221" gradientUnits="userSpaceOnUse"><stop stop-color="#542DA7"/><stop offset=".833" stop-color="#5F2EAF" stop-opacity="0"/></linearGradient><linearGradient id="m-dark" x1="452.299" x2="711.758" y1="506.015" y2="579.099" gradientUnits="userSpaceOnUse"><stop stop-color="#F6D25B"/><stop offset="1" stop-color="#F9A38F"/></linearGradient><linearGradient id="n-dark" x1="825.466" x2="836.377" y1="303.379" y2="579.688" gradientUnits="userSpaceOnUse"><stop stop-color="#FA80B7"/><stop offset="1" stop-color="#F8A48D"/></linearGradient><linearGradient id="o-dark" x1="236.692" x2="795.806" y1="166.152" y2="195.386" gradientUnits="userSpaceOnUse"><stop stop-color="#E755F3"/><stop offset="1" stop-color="#F97FB6"/></linearGradient><clipPath id="a-dark"><path fill="#fff" d="M0 0h4053v1000H0z"/></clipPath><clipPath id="b-dark"><path fill="#fff" d="M0 0h991.962v1000H0z"/></clipPath></defs></svg>
							</A>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
}

function KeyboardShortcut(props: { key: string; class?: string }) {
	return (
		<kbd
			classList={{
				"min-w-6 rounded border border-black/10 bg-slate-100 dark:bg-slate-700 dark:border-slate-700 px-1 pb-px pt-1 text-center font-mono text-xs": true,
				[props.class ?? ""]: true
			}}
		>
			{props.key}
		</kbd>
	);
}

function trimText(text: string, term: string, wordPadding: number) {
	const termIndex = text.toLowerCase().indexOf(term.toLowerCase());
	if (termIndex === -1) return text;
	const substringBeforeTerm = text.substring(0, termIndex);
	const wordsBeforeTerm = substringBeforeTerm.split(" ");
	const startWordIndex = Math.max(0, wordsBeforeTerm.length - wordPadding);
	const trimmedResult = wordsBeforeTerm.slice(startWordIndex).join(" ") + text.substring(termIndex);
	return (startWordIndex > 0 ? "..." : "") + trimmedResult;
}
