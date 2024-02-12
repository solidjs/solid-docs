import { Component, Index, Show, Suspense, createResource } from "solid-js";
import { Button } from "../button";
import { codeToHtml } from "shikiji";
import { clientOnly } from "@solidjs/start";
import { counterTxt, snippetLines } from "./hero-code-snippet";

const RenderedCode = clientOnly(() => import("./hero-code-snippet"));

const TrafficLightsIcon: Component<{ class: string }> = (props) => {
	return (
		<svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
			<circle cx="5" cy="5" r="4.5" />
			<circle cx="21" cy="5" r="4.5" />
			<circle cx="37" cy="5" r="4.5" />
		</svg>
	);
};

export const Hero: Component = () => {
	return (
		<div class="overflow-hidden bg-slate-900 mt-[4.75rem]">
			<div class="py-8 sm:px-2 lg:relative">
				<div class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
					<div class="relative md:text-center lg:text-left">
						<div class="relative">
							<h2 class="inline bg-gradient-to-r from-indigo-200 via-blue-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
								Effortless UIs with Reactive Precision.
							</h2>
							<p class="mt-3 text-2xl tracking-tight text-slate-300">
								SolidJS is a modern JavaScript framework for today's web.
							</p>
							<div class="mt-8 flex gap-4 md:justify-center lg:justify-start">
								<Button href="/quick-start" variant="primary">
									Get started
								</Button>
								<Button href="https://discord.gg/solidjs" variant="secondary">
									Join the community
								</Button>
							</div>
						</div>
					</div>
					<div class="relative lg:static xl:pl-10">
						<div class="relative">
							<div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500 dark:from-blue-300 via-blue-500/70 dark:via-blue-300/70 to-blue-300 opacity-10 blur-lg dark:bg-white" />
							<div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-300 via-blue-300/70 to-blue-300 opacity-10" />
							<div class="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-blue-200/10 backdrop-blur">
								<div class="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-blue-300/0 via-blue-300/70 to-blue-300/0" />
								<div class="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-800 dark:via-blue-400 to-blue-400/0" />
								<div class="pl-4 pt-4">
									<TrafficLightsIcon class="h-2.5 w-auto stroke-slate-500/30" />
									<div class="mt-4 flex space-x-2 text-xs">
										<div class="flex h-6 rounded-full border dark:border-none border-blue-400 shadow-sm bg-gradient-to-r from-blue-400/30  via-blue-400 to-blue-400/30 p-px font-medium text-blue-300 ">
											<div class="flex items-center rounded-full px-2.5 bg-slate-800">
												Counter.jsx
											</div>
										</div>
									</div>
									<div class="mt-6 flex items-start px-1 text-sm">
										<div
											aria-hidden="true"
											class="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-300 pb-6"
										>
											<Index each={snippetLines}>
												{(_, index) => (
													<pre class="pb-px">{(index + 1).toString().padStart(2, "0")}</pre>
												)}
											</Index>
										</div>
										<div
											class={`flex overflow-x-auto custom-scrollbar px-4 min-h-[${
												snippetLines.length + 5
											}em] text-white `}
										>
											<Suspense fallback={<pre class="text-slate-700">{counterTxt}</pre>}>
												<RenderedCode />
											</Suspense>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
