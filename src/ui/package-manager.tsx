import { makePersisted, messageSync } from "@solid-primitives/storage";
import { createSignal, For } from "solid-js";
import { Tabs, TabList, Tab, TabPanel } from "~/ui/tabs";

const PACKAGE_MANAGERS = ["npm", "pnpm", "bun", "yarn", "deno"] as const;

export type PackageManagerType = (typeof PACKAGE_MANAGERS)[number];
export type Command = "install" | "exec" | "remove";

const installCommand = {
	npm: "install",
	pnpm: "install",
	bun: "install",
	yarn: "add",
	deno: "add",
} satisfies Record<PackageManagerType, string>;

const devInstallFlag = {
	npm: "--save-dev",
	pnpm: "install",
	bun: "install",
	yarn: "add",
	deno: "add",
} satisfies Record<PackageManagerType, string>;

const globalInstallFlag = {
	npm: "-g",
	pnpm: "-g",
	bun: "-g",
	yarn: "-g",
	deno: "-g",
} satisfies Record<PackageManagerType, string>;

const execCommand = {
	npm: "npx",
	pnpm: "pnpx",
	bun: "bunx",
	yarn: "dlx",
	deno: "dpx",
} satisfies Record<PackageManagerType, string>;

const removeCommand = {
	npm: "remove",
	pnpm: "remove",
	bun: "remove",
	yarn: "remove",
	deno: "remove",
} satisfies Record<PackageManagerType, string>;

type PackageManagerProps = {
	command: Command;
	args: Array<string>;
	devInstall?: boolean;
	globalInstall?: boolean;
};

export function PackageManager(props: PackageManagerProps) {
	const [selectedPm, setSelectedPm] = makePersisted(createSignal("npm"), {
		name: "package-manager",
		sync: messageSync(new BroadcastChannel("package-manager")),
	});

	const generateCommandFor = (pm: PackageManagerType) => {
		const cmd = [pm] as Array<string>;
		const args = props.args.join(" ");

		switch (props.command) {
			case "install":
				cmd.push(installCommand[pm]);
				cmd.push(args);
				if (props.globalInstall) {
					cmd.push(globalInstallFlag[pm]);
				} else if (props.devInstall) {
					cmd.push(devInstallFlag[pm]);
				}
				break;
			case "exec":
				cmd.push(execCommand[pm]);
				cmd.push(args);
				break;
			case "remove":
				cmd.push(removeCommand[pm]);
				cmd.push(args);
				break;
		}

		return cmd.join(" ");
	};

	return (
		<Tabs value={selectedPm()} onChange={setSelectedPm}>
			<TabList>
				<For each={PACKAGE_MANAGERS}>{(pm) => <Tab value={pm}>{pm}</Tab>}</For>
			</TabList>
			<For each={PACKAGE_MANAGERS}>
				{(pm) => <TabPanel value={pm}>{generateCommandFor(pm)}</TabPanel>}
			</For>
		</Tabs>
	);
}
