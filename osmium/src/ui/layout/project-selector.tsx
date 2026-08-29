import { Popover } from "@kobalte/core/popover";
import { createMemo, createSignal, For } from "solid-js";
import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";
import { useProject } from "../../utils";

export function ProjectSelector() {
	const [open, setOpen] = createSignal(false);
	const project = useProject();
	const options = createMemo(() =>
		Object.entries(project().projects).map(([key, value]) => ({
			key,
			href: key === "start" ? "/solid-start/v2" : `/${value.path}`,
			label: value.label,
		}))
	);
	const currentOption = createMemo(() =>
		options().find((option) => option.key === project().current)
	);

	return (
		<Popover
			open={open()}
			onOpenChange={setOpen}
			gutter={4}
			placement="bottom-start"
		>
			<Popover.Trigger
				class="text-action hover:bg-action-muted hover:text-action-hover focus-visible:ring-focus focus-visible:ring-offset-surface flex min-h-11 w-full min-w-0 items-center justify-between rounded px-2 text-left text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:min-h-8 lg:w-auto lg:justify-start lg:rounded-none lg:px-2"
				aria-label={`Change project, current project ${currentOption()?.label ?? "Solid"}`}
			>
				<span class="min-w-0 truncate">{currentOption()?.label}</span>
				<Icon class="ml-1 size-3.5 shrink-0 fill-current" path={chevronDown} />
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content class="border-border bg-surface-raised text-text z-50 min-w-36 space-y-1 rounded border p-1 text-sm shadow-lg">
					<For each={options()}>
						{(option) => (
							<a
								href={option.href}
								aria-current={
									option.key === project().current ? "page" : undefined
								}
								class="hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:ring-focus aria-[current]:border-action aria-[current]:bg-action-muted aria-[current]:text-action flex min-h-11 items-center rounded border-l-2 border-transparent px-3 py-1 font-medium focus-visible:ring-2 focus-visible:outline-none lg:min-h-8"
								onMouseEnter={(event) => event.currentTarget.focus()}
								onClick={() => setOpen(false)}
							>
								{option.label}
							</a>
						)}
					</For>
				</Popover.Content>
			</Popover.Portal>
		</Popover>
	);
}
