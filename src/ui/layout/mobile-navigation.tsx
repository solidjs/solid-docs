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
				<Icon path={bars_3} class="prose h-6 dark:prose-invert" />
			</Dialog.Trigger>
			<Dialog.Portal>
				<div class="fixed inset-0 z-50 flex justify-start">
					<Dialog.Overlay class="data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-50 bg-white/10 backdrop-blur-sm transition-all duration-100" />
					<Dialog.Content class="z-50 flex h-full w-5/6 max-w-md scale-100 flex-col overflow-y-auto border border-none bg-slate-50 px-3 opacity-100 shadow-lg dark:bg-slate-900">
						<Dialog.CloseButton class="sticky top-0 z-20 mb-3 self-end pt-4">
							<Icon path={xMark} class="prose w-6 dark:prose-invert" />
						</Dialog.CloseButton>
						<Dialog.Description class="w-full pr-3">
							<MainNavigation tree={props.tree} />
						</Dialog.Description>
					</Dialog.Content>
				</div>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
