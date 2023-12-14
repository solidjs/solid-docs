import { Component } from "solid-js";
import { A, useLocation } from "solid-start";

export const TableOfContents: Component = () => {
	const location = useLocation();
	const tableOfContents = [
		{
			id: "section1",
			title: "Section 1",
			children: [
				{
					id: "subsection1",
					title: "Subsection 1",
				},
				{
					id: "subsection2",
					title: "Subsection 2",
				},
			],
		},
		{
			id: "section2",
			title: "Section 2",
			children: [
				{
					id: "subsection3",
					title: "Subsection 3",
				},
				{
					id: "subsection4",
					title: "Subsection 4",
				},
			],
		},
	];

	return (
		<div class="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-4 xl:pr-6">
			<nav aria-labelledby="on-this-page-title" class="w-56">
				{tableOfContents.length > 0 && (
					<>
						<h2
							id="on-this-page-title"
							class="font-display text-sm font-medium text-slate-900 dark:text-white"
						>
							On this page
						</h2>
						<ol role="list" class="mt-2 space-y-3 text-sm list-none">
							{tableOfContents.map((section) => (
								<li key={section.id}>
									<h3>
										<A
											href={`${location.pathname}#${section.id}`}
											activeClass="text-sky-500"
											inactiveClass="font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
										>
											{section.title}
										</A>
									</h3>
									{section.children.length > 0 && (
										<ol
											role="list"
											class="space-y-3 pl-5 text-slate-500 dark:text-slate-400 list-none"
										>
											{section.children.map((subSection) => (
												<li>
													<A
														href={`${location.pathname}#${subSection.id}`}
														activeClass="text-sky-500"
														inactiveClass="hover:text-slate-600 dark:hover:text-slate-300"
													>
														{subSection.title}
													</A>
												</li>
											))}
										</ol>
									)}
								</li>
							))}
						</ol>
					</>
				)}
			</nav>
		</div>
	);
};
