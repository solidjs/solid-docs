import { ProjectLogo, GitHubIcon, DiscordIcon } from "../logo";
import { ThemeSelector } from "./theme-selector";
import { MobileNavigation } from "./mobile-navigation";
import { LanguageSelector } from "./language-selector";
import { MobileTableOfContents } from "./table-of-contents";
import { ProjectSelector } from "./project-selector";
import VersionSelector from "./version-selector";

import { clientOnly } from "@solidjs/start";
import { useProject, useRouteConfig } from "../../utils";

const ClientSearch = clientOnly(() =>
	import("../search").then((m) => ({ default: m.Search }))
);

interface MainHeaderProps {}

export function MainHeader(_props: MainHeaderProps) {
	const config = useRouteConfig();

	const project = useProject();

	return (
		<header class="border-border bg-surface text-text sticky top-0 z-50 block border-b">
			<div class="mx-auto flex h-16 w-full max-w-[96rem] items-center gap-1 px-2 sm:px-4 lg:gap-2 lg:px-6">
				<div class="flex min-w-0 flex-1 items-center lg:flex-none">
					<div class="flex lg:hidden">
						<MobileNavigation />
					</div>
					<a
						href={`/${project().projects[project().current].path}`}
						aria-label={`${project().projects[project().current].label} documentation home`}
						class="focus-visible:ring-focus focus-visible:ring-offset-surface flex min-h-11 min-w-0 items-center rounded px-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:min-h-8"
					>
						<ProjectLogo class="size-6" />
					</a>
				</div>

				<div class="hidden min-w-0 items-center gap-1 lg:flex">
					<ProjectSelector />
					<VersionSelector />
				</div>

				<div class="flex min-w-0 items-center justify-end gap-0.5 lg:ml-auto lg:gap-1.5">
					<ClientSearch />
					<a
						href={`${config().themeConfig?.github}/${project().projects[project().current].path || "solid"}`}
						class="group text-text-muted hover:bg-surface-muted hover:text-text focus-visible:ring-focus focus-visible:ring-offset-surface hidden size-11 shrink-0 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:flex lg:size-8"
						aria-label="GitHub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon class="size-4 fill-current" />
					</a>
					<a
						href={config().themeConfig?.discord}
						class="group text-text-muted hover:bg-surface-muted hover:text-text focus-visible:ring-focus focus-visible:ring-offset-surface hidden size-11 shrink-0 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:flex lg:size-8"
						aria-label="Discord"
						target="_blank"
						rel="noopener noreferrer"
					>
						<DiscordIcon class="size-4 fill-current" />
					</a>
					<ThemeSelector />
					<LanguageSelector />
				</div>
			</div>
			<MobileTableOfContents />
		</header>
	);
}
