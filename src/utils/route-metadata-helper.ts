import { useLocation } from "@solidjs/router";
import { SUPPORTED_LOCALES } from "~/i18n/config";

export enum Project {
	Core = "",
	Router = "/solid-router",
	Start = "/solid-start",
	Meta = "/solid-meta",
}

interface CurrentRouteMetaData {
	project: Project | null;
	locale: string;
	isProjectRoot: boolean;
}

export const useCurrentRouteMetaData = (): CurrentRouteMetaData => {
	let currentPath = useLocation().pathname;

	// Trim trailing slash
	currentPath = currentPath.endsWith("/")
		? currentPath.slice(0, -1)
		: currentPath;

	const pathParts = currentPath.split("/").filter(Boolean);
	const projectOrLocale: string = pathParts[0];

	const returnObject: CurrentRouteMetaData = {
		isProjectRoot: true,
		locale: "",
		project: null,
	};

	if (SUPPORTED_LOCALES.includes(projectOrLocale)) {
		if (pathParts.length > 2) {
			returnObject.isProjectRoot = false;
		}

		returnObject.locale = projectOrLocale;
		checkPathBeyondLocale(pathParts[1] ?? "");
	} else {
		if (pathParts.length > 1) {
			returnObject.isProjectRoot = false;
		}

		checkPathBeyondLocale(pathParts[0] ?? "");
	}

	function isInProjectEnum(projectPath: string): boolean {
		return Object.values(Project).includes(projectPath as Project);
	}

	function checkPathBeyondLocale(path: string) {
		if (path.length > 0) {
			path = "/" + path;
		}

		if (isInProjectEnum(path)) {
			returnObject.project = path as Project;
		} else {
			returnObject.isProjectRoot = false;
			returnObject.project = "" as Project;
		}
	}

	return returnObject;
};
