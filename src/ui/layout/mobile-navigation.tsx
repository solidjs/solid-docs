import { Dialog } from "@kobalte/core";
import { Icon } from "solid-heroicons";
import { bars_3, xMark } from "solid-heroicons/solid";
import { MainNavigation } from "./main-navigation";
import { createSignal } from "solid-js";

interface Entry {
	title: string;
	path: string;
	children?: Entry[];
	mainNavExclude: boolean;
	isTranslated?: boolean;
}

interface NavProps {
	tree: {
		learn: Entry[];
		reference: Entry[];
	};
}

export const [isOpen, setIsOpen] = createSignal(false);

export const MobileNavigation = (props: NavProps) => {
	return (
		<Dialog.Root open={isOpen()} onOpenChange={setIsOpen}>
			<Dialog.Trigger>
				<Icon path={bars_3} class="h-6 prose dark:prose-invert" />
			</Dialog.Trigger>
			<Dialog.Portal>
				<div class="fixed inset-0 z-50 flex justify-start">
					<Dialog.Overlay class="bg-white/10 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-50 backdrop-blur-sm transition-all duration-100" />
					<Dialog.Content class="w-5/6 max-w-md h-full border-none dark:bg-slate-900 bg-slate-50 z-50 scale-100 border px-3 opacity-100 shadow-lg overflow-y-auto flex flex-col">
						<Dialog.CloseButton class="sticky top-0 self-end pt-4 mb-3 z-20">
							<Icon path={xMark} class="w-6 dark:prose-invert prose" />
						</Dialog.CloseButton>
						<Dialog.Description class="pr-3 w-full">
							<MainNavigation tree={props.tree} />
						</Dialog.Description>
					</Dialog.Content>
				</div>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
