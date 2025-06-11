import { createEffect, createSignal, type Accessor } from "solid-js";
import { useMatch } from "@solidjs/router";
import { SUPPORTED_LOCALES } from "~/i18n/config";
import { useI18n } from "~/i18n/i18n-context";

type Project = "solid-start" | "solid-router" | "solid-meta" | "solid";

export function useProject(): Accessor<Project> {
	const match = useMatch(() => "/:locale?/:project/*", {
		locale: SUPPORTED_LOCALES,
		project: ["solid-start", "solid-router", "solid-meta"],
	});

	return () => (match()?.params.project as Project) ?? "solid";
}

export function useProjectTitle(): Accessor<string> {
	const [title, setTitle] = createSignal("");
	const project = useProject();
	const i18n = useI18n();

	createEffect(() => {
		switch (project()) {
			case "solid-start":
				setTitle(i18n.t("meta.title.solid_start"));
				break;
			case "solid-router":
				setTitle(i18n.t("meta.title.solid_router"));
				break;
			case "solid-meta":
				setTitle(i18n.t("meta.title.solid_meta"));
				break;
			default:
				setTitle(i18n.t("meta.title.solid"));
		}
	});

	return title;
}
