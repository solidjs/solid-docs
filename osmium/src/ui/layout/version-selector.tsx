import { Popover } from "@kobalte/core/popover";
import { createMemo, createSignal, For, Show } from "solid-js";
import { useRouteConfig } from "../../utils";
import { useSolidBaseRoute } from "@kobalte/solidbase/client";
import {
	getSolidBaseRouteFallbackOptions,
	SolidBaseRouteOption,
} from "@kobalte/solidbase/config/route";
import { Icon } from "solid-heroicons";
import { chevronUpDown, tag } from "solid-heroicons/solid";

export default function VersionSelector() {
	const [open, setOpen] = createSignal(false);

	const config = useRouteConfig();

	const current = useSolidBaseRoute();
	const options = createMemo(() =>
		getSolidBaseRouteFallbackOptions(config().routes, "version", current())
	);
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
					sameWidth
					placement="bottom-start"
				>
					<div class="mx-1">
						<Popover.Trigger
							class="flex h-10 w-full items-center justify-between rounded-lg text-left shadow-md ring-1 shadow-black/5 ring-black/90 ring-inset dark:ring-white/10"
							aria-label="Change version"
							disabled={options().length <= 1}
						>
							<span class="prose prose-slate flex items-center truncate pl-2 text-lg text-slate-700 dark:text-slate-300">
								<Icon
									class="mr-2 w-5 fill-slate-700 pl-1 dark:fill-slate-200"
									path={tag}
								/>
								{getOptionLabel(current())}
							</span>

							<Show when={options().length > 1}>
								<Icon
									class="mr-2 w-6 fill-slate-700 pl-1 dark:fill-slate-200"
									path={chevronUpDown}
								/>
							</Show>
						</Popover.Trigger>
					</div>
					<Popover.Portal>
						<Popover.Content class="z-50 space-y-1 rounded-xl bg-white p-2 text-sm shadow-md ring-1 shadow-black/5 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
							<For each={options()}>
								{(option) => {
									const outbound = () => !!option.href;

									return (
										<a
											class="group flex cursor-pointer items-center rounded-[0.625rem] p-1 select-none hover:bg-slate-200 focus:bg-slate-200 focus:font-medium focus:outline-hidden hover:dark:bg-slate-600 focus:dark:bg-slate-700"
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
