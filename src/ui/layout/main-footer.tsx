export function MainFooter() {
	return (
		<footer class="w-full flex flex-none flex-wrap items-center justify-between mx-auto bg-sky-100/40 shadow-md dark:shadow-slate-900/5 dark:shadow-none sm:px-6 lg:px-8 backdrop-blur dark:bg-slate-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75 prose prose-slate dark:prose-invert dark:text-slate-400">
			<ul class="flex flex-row gap-5 w-full text-sm md:text-base">
				<li>
					<a
						href="https://www.solidjs.com/ecosystem"
						rel="noopener"
						target="_blank"
					>
						Solid Ecosystem
					</a>
				</li>

				<li>
					<a
						href="https://github.com/solidjs/solid-docs-next/blob/main/CONTRIBUTING.md"
						rel="noopener"
						target="_blank"
					>
						Contribution Guide
					</a>
				</li>

				<li>
					<a
						href="https://opencollective.com/solid"
						rel="noopener"
						target="_blank"
					>
						Open Collective
					</a>
				</li>
				<li>
					<a href="https://github.com/solidjs" rel="noopener" target="_blank">
						GitHub
					</a>
				</li>
			</ul>
		</footer>
	);
}
