import {
	createSignal,
	Show,
	onMount,
	type JSX,
	createEffect,
	children,
	createMemo,
	ParentProps,
} from "solid-js";
import { useLocation } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import type { coreEntries } from "solid:collection";
import { Pagination } from "~/ui/pagination";
import { EditPageLink } from "./edit-page-link";
import { PageIssueLink } from "./page-issue-link";
import { DynamicImage } from "@solid-mediakit/og";

export const [trackHeading, setTrackHeading] = createSignal("");
const OpenGraph = (props: ParentProps<{ origin: string }>) => {
	const child = children(() => props.children);
	const url = createMemo(() => child()?.toString());
	return (
		<>
			<Meta property="og:image" content={props.origin + url()} />
			<Meta property="twitter:card" content={props.origin + url()} />
		</>
	);
};
interface DocsLayoutProps {
	entries: typeof coreEntries;
	children: JSX.Element;
}

export const DocsLayout = (props: DocsLayoutProps) => {
	const location = useLocation();

	const lastSegmentPath = () => location.pathname.split("/").reverse()[0];
	const collection = () =>
		location.pathname.includes("/reference/")
			? props.entries.reference
			: props.entries.learn;

	const entryIndex = () =>
		collection()!.findIndex((element) => lastSegmentPath() === element.slug);

	const titles = () => {
		const fullEntry = collection
			? collection()![entryIndex()]
			: { parent: undefined, title: undefined };
		if (fullEntry) {
			return {
				parent: fullEntry?.parent !== "root" ? fullEntry.parent : undefined,
				title: fullEntry?.title,
			};
		}
	};

	onMount(() => document.dispatchEvent(new CustomEvent("docs-layout-mounted")));
	const articleElements = children(() => props.children);
	const contentPreview = createMemo(() =>
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		(articleElements()![1]?.innerText as string)?.replace("\n", "")
	);
	// .replace("\n", "")
	// createEffect(() => console.log(contentPreview()));
	return (
		<>
			<OpenGraph origin="">
				<DynamicImage>
					<div
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							"flex-direction": "column",
							background: "rgb(15 23 42)",
							color: "rgb(203 213 225)",
						}}
					>
						<div
							style={{
								display: "flex",
								"flex-direction": "row",
							}}
						>
							<div
								style={{
									width: "80%",
									display: "flex",
									"flex-direction": "column",
									padding: "20px",
									"font-size": "100px",
									"padding-bottom": "0px",
								}}
							>
								<div>Solid Docs</div>
								<div style={{ "font-size": "86px" }}>Core</div>
							</div>
							<div style={{ display: "flex", padding: "40px" }}>
								<svg
									style={{
										right: "50px",
									}}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 166 155.3"
								>
									<defs>
										<linearGradient
											id="a"
											gradientUnits="userSpaceOnUse"
											x1="27.5"
											y1="3"
											x2="152"
											y2="63.5"
										>
											<stop offset=".1" stop-color="#76b3e1" />
											<stop offset=".3" stop-color="#dcf2fd" />
											<stop offset="1" stop-color="#76b3e1" />
										</linearGradient>
										<linearGradient
											id="b"
											gradientUnits="userSpaceOnUse"
											x1="95.8"
											y1="32.6"
											x2="74"
											y2="105.2"
										>
											<stop offset="0" stop-color="#76b3e1" />
											<stop offset=".5" stop-color="#4377bb" />
											<stop offset="1" stop-color="#1f3b77" />
										</linearGradient>
										<linearGradient
											id="c"
											gradientUnits="userSpaceOnUse"
											x1="18.4"
											y1="64.2"
											x2="144.3"
											y2="149.8"
										>
											<stop offset="0" stop-color="#315aa9" />
											<stop offset=".5" stop-color="#518ac8" />
											<stop offset="1" stop-color="#315aa9" />
										</linearGradient>
										<linearGradient
											id="d"
											gradientUnits="userSpaceOnUse"
											x1="75.2"
											y1="74.5"
											x2="24.4"
											y2="260.8"
										>
											<stop offset="0" stop-color="#4377bb" />
											<stop offset=".5" stop-color="#1a336b" />
											<stop offset="1" stop-color="#1a336b" />
										</linearGradient>
									</defs>
									<path
										d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
										fill="#76b3e1"
									/>
									<path
										d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
										opacity=".3"
										fill="url(#a)"
									/>
									<path
										d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
										fill="#518ac8"
									/>
									<path
										d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
										opacity=".3"
										fill="url(#b)"
									/>
									<path
										d="M134 80a45 45 0 00-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z"
										fill="url(#c)"
									/>
									<path
										d="M114 115a45 45 0 00-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z"
										fill="url(#d)"
									/>
								</svg>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								"flex-direction": "column",
								"padding-left": "24px",
								"padding-top": "0px",
							}}
						>
							<div style={{ "font-size": "30px", "padding-top": "0px" }}>
								{titles()?.title}
							</div>
							<p style={{ "font-size": "20px", margin: "0px" }}>
								{contentPreview()}
							</p>
						</div>
					</div>
				</DynamicImage>
			</OpenGraph>
			<Show when={props.entries} keyed>
				<>
					<Show when={titles()?.title} fallback={<Title>SolidDocs</Title>}>
						{(title) => <Title>{`${title()} - SolidDocs`}</Title>}
					</Show>
					<div id="rr" class="flex relative justify-center">
						<article class="w-fit overflow-hidden pb-16 lg:px-5 expressive-code-overrides lg:max-w-none">
							<Show when={titles()?.parent}>
								{(t) => (
									<span class="text-sm font-semibold text-blue-700 dark:text-blue-300 my-1">
										{t()}
									</span>
								)}
							</Show>
							<Show when={titles()?.title}>
								{(t) => (
									<h1 class="prose-headings:text-[2.8rem] text-slate-900 dark:text-white">
										{t()}
									</h1>
								)}
							</Show>
							<span class="xl:hidden text-sm -mt-[15px] block">
								<EditPageLink />
							</span>
							<div class="max-w-2xl w-full">{articleElements()}</div>
							<span class="xl:hidden text-sm">
								<PageIssueLink />
							</span>
							<Pagination
								currentIndex={entryIndex()}
								collection={collection()}
							/>
						</article>
					</div>
				</>
			</Show>
		</>
	);
};
