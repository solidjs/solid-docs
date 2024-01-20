import { Dialog } from "@kobalte/core";
import { Icon } from "solid-heroicons";
import { bars_3, xMark } from "solid-heroicons/solid";
import { MainNavigation } from "./main-navigation";
import { createSignal } from "solid-js";

export const [isOpen, setIsOpen] = createSignal(false);

export const MobileNavigation = () => {
	return (
		<Dialog.Root open={isOpen()} onOpenChange={setIsOpen}>
			<Dialog.Trigger>
				<Icon path={bars_3} class="h-6 prose dark:prose-invert" />
			</Dialog.Trigger>
			<Dialog.Portal>
				<div class="fixed inset-0 z-50 flex justify-start">
					<Dialog.Overlay class="bg-white/10 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-50 backdrop-blur-sm transition-all duration-100" />
					<Dialog.Content class="w-5/6 sm:w-2/3 h-full dark:bg-slate-900 border-none bg-blue-100/90 z-50 scale-100 border px-3 opacity-100 shadow-lg overflow-y-auto flex">
						<Dialog.Description class="mx-8">
							<MainNavigation />
						</Dialog.Description>
						<Dialog.CloseButton class="sticky top-6 right-3 mb-3 z-10 self-start">
							<Icon path={xMark} class="w-6 dark:prose-invert prose" />
						</Dialog.CloseButton>
					</Dialog.Content>
				</div>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
