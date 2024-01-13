import { For } from "solid-js";

export function MainFooter() {
	const links = [
		{
			name: "Solid Ecosystem",
			href: "/",
		},
		{
			name: "Contribution Guide",
			href: "/",
		},
		{
			name: "Open Collective",
			href: "/",
		},
		{
			name: "GitHub",
			href: "/",
		},
	];

	return (
		<footer class="border-t mx-6 mt-4 border-slate-300 dark:border-slate-700 lg:mt-6 lg:space-y-4 lg:border-slate-300">
			<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 lg:py-8">
				<div class="lg:flex lg:items-end lg:justify-between place-items-center">
					<div class="flex justify-center items-center lg:justify-start">
						<img src="/assets/solid.svg" alt="SolidJS logo" class="h-10" />
						<span class="prose dark:prose-invert text-xl mt-1 pl-1">
							<b>Solid</b> Docs
						</span>
					</div>

					<ul class="flex flex-wrap gap-6 md:gap-8 lg:gap-12 my-auto">
						<For each={links}>
							{(link) => (
								<li>
									<a
										class="prose text-sm hover:underline place-self-center dark:hover:text-white transition dark:prose-invert"
										href={link.href}
									>
										{link.name}
									</a>
								</li>
							)}
						</For>
					</ul>
				</div>
			</div>
		</footer>
	);
}
