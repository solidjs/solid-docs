import { Popover } from "@kobalte/core/popover";
import { createMemo, createSignal, For, Show } from "solid-js";
import {
	useSolidBaseRoute,
	useSolidBaseRouteFallbackOptions,
} from "@kobalte/solidbase/client";
import type { SolidBaseRouteOption } from "@kobalte/solidbase/config/route";
import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";

export default function VersionSelector() {
	const [open, setOpen] = createSignal(false);

	const current = useSolidBaseRoute();
	const options = useSolidBaseRouteFallbackOptions("version");
	const currentOption = createMemo(() =>
		options().find((option) => option.name === current().version)
	);

	const getOptionLabel = (option: SolidBaseRouteOption) => {
		return typeof option.meta.label === "string"
			? option.meta.label
			: option.name;
	};

	return (
		<Show when={options().length > 1 && currentOption()}>
			{(current) => (
				<Popover
					open={open()}
					onOpenChange={setOpen}
					gutter={4}
					placement="bottom-start"
				>
					<Popover.Trigger
						class="text-text hover:bg-surface-muted focus-visible:ring-focus focus-visible:ring-offset-surface flex min-h-11 w-full min-w-0 items-center justify-between rounded px-2 text-left text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:min-h-8 lg:w-auto lg:justify-start lg:rounded-none lg:px-2"
						aria-label={`Change version, current version ${getOptionLabel(current())}`}
						disabled={options().length <= 1}
					>
						<span class="min-w-0 truncate">{getOptionLabel(current())}</span>

						<Show when={options().length > 1}>
							<Icon
								class="fill-text-subtle ml-1 size-3.5 shrink-0"
								path={chevronDown}
							/>
						</Show>
					</Popover.Trigger>
					<Popover.Portal>
						<Popover.Content class="border-border bg-surface-raised text-text z-50 min-w-32 space-y-1 rounded border p-1 text-sm shadow-lg">
							<For each={options()}>
								{(option) => {
									const outbound = () => !!option.href;

									return (
										<a
											class="group hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:ring-focus aria-[current]:border-action aria-[current]:bg-action-muted aria-[current]:text-action flex min-h-11 cursor-pointer items-center rounded border-l-2 border-transparent px-3 py-1 font-medium select-none focus-visible:ring-2 focus-visible:outline-none lg:min-h-8"
											target={outbound() ? "_blank" : undefined}
											rel={outbound() ? "noopener noreferrer" : undefined}
											aria-current={option === currentOption() || undefined}
											href={option.href ?? option.path}
											onMouseEnter={(e) => e.currentTarget.focus()}
											onClick={() => setOpen(false)}
										>
											{getOptionLabel(option)}
										</a>
									);
								}}
							</For>
						</Popover.Content>
					</Popover.Portal>
				</Popover>
			)}
		</Show>
	);
}
