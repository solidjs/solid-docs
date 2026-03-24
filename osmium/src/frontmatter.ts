import { BaseFrontmatter, useFrontmatter } from "@kobalte/solidbase/client";
import { createMemo } from "solid-js";

export function useOsmiumThemeFrontmatter() {
	const frontmatter = useFrontmatter<OsmiumThemeFrontmatter>();

	return createMemo(() => {
		const data = frontmatter();
		if (!data) return data;

		data.editLink ??= true;
		data.lastUpdated ??= true;

		if (data?.layout === "home") {
			data.sidebar = false;
			data.footer = false;
			data.toc = false;
			data.prev = false;
			data.next = false;
			data.editLink = false;
			data.lastUpdated = false;
		}

		return data;
	});
}

export type RelativePageConfig =
	| string
	| false
	| {
			text?: string;
			link?: string;
	  };

interface OsmiumThemeBaseFrontmatter {
	category?: string;
	sidebar?: boolean;
	footer?: boolean;
	toc?: boolean;
	prev?: RelativePageConfig;
	next?: RelativePageConfig;
	editLink?: boolean;
	lastUpdated?: boolean;
}

interface HeroActionConfig {
	theme?: string;
	text?: string;
	link?: string;
}

export interface HeroConfig {
	name?: string;
	text?: string;
	tagline?: string;
	image?: {
		src: string;
		alt?: string;
	};
	actions?: Array<HeroActionConfig>;
}

export interface FeaturesConfig {
	icon?: string;
	title?: string;
	details?: string;
}

interface HomeLayoutFrontmatter {
	layout?: "home";
	hero?: HeroConfig;
	features?: Array<FeaturesConfig>;
}

export type OsmiumThemeFrontmatter = (BaseFrontmatter &
	OsmiumThemeBaseFrontmatter) &
	HomeLayoutFrontmatter;
