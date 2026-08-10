import { Dialog } from "@kobalte/core";
import { Icon } from "solid-heroicons";
import { bars_3, xMark } from "solid-heroicons/solid";
import { MainNavigation } from "./main-navigation";
import { createSignal } from "solid-js";

interface MobileNavigationProps {}

export const [isOpen, setIsOpen] = createSignal(false);

export const MobileNavigation = (_props: MobileNavigationProps) => {
	return (
		<Dialog.Root open={isOpen()} onOpenChange={setIsOpen}>
			<Dialog.Trigger
				aria-label="Open navigation menu"
				title="Open navigation menu"
				class="flex size-11 shrink-0 items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900"
			>
				<Icon path={bars_3} class="prose dark:prose-invert h-6" />
			</Dialog.Trigger>
			<Dialog.Portal>
				<div class="fixed inset-0 z-50 flex justify-start">
					<Dialog.Overlay class="data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-50 bg-white/10 backdrop-blur-sm transition-all duration-100" />
					<Dialog.Content class="z-50 flex h-full w-5/6 max-w-md scale-100 flex-col overflow-y-auto border border-none bg-slate-50 px-3 opacity-100 shadow-lg dark:bg-slate-900">
						<Dialog.Title class="sr-only">
							Documentation navigation
						</Dialog.Title>
						<Dialog.CloseButton
							aria-label="Close navigation menu"
							class="sticky top-1 z-20 mb-1 flex size-11 shrink-0 items-center justify-center self-end rounded-lg bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-slate-900 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900"
						>
							<Icon
								path={xMark}
								aria-hidden="true"
								class="prose dark:prose-invert h-6 w-6"
							/>
						</Dialog.CloseButton>
						<div class="w-full pr-3">
							<MainNavigation />
						</div>
					</Dialog.Content>
				</div>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
