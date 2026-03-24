import { defineTheme } from "@kobalte/solidbase/config";
import type { SidebarConfig } from "@kobalte/solidbase/config/sidebar";
import { fileURLToPath } from "node:url";

export interface OsmiumThemeConfig {
	projects?: ProjectConfig[];
	sidebar?: SidebarConfig;
	reportPagePath?: string;
	fonts?: { [K in keyof typeof allFonts]?: false } | false;
}

export interface ProjectConfig {
	path: string;
	name: string;
}

type Font = { cssPath: string; preloadFontPath: string; fontType: string };

const allFonts = {
	geist: {
		cssPath: import.meta.resolve("@fontsource-variable/geist"),
		preloadFontPath: import.meta
			.resolve("@fontsource-variable/geist/files/geist-latin-wght-normal.woff2"),
		fontType: "woff2",
	},
	geistMono: {
		cssPath: import.meta.resolve("@fontsource-variable/geist-mono"),
		preloadFontPath: import.meta
			.resolve("@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2"),
		fontType: "woff2",
	},
} satisfies Record<string, Font>;

export const osmium = defineTheme<OsmiumThemeConfig>({
	componentsPath: import.meta.resolve("."),
	vite(config) {
		const filteredFonts: Array<Font> = [];

		if (config?.themeConfig?.fonts !== false) {
			const fonts = config?.themeConfig?.fonts;
			for (const [font, paths] of Object.entries(allFonts)) {
				if (fonts?.[font as keyof typeof fonts] !== false)
					filteredFonts.push(paths);
			}
		}

		return [
			{
				name: "solidbase-osmium-fonts",
				resolveId(id) {
					if (id.startsWith("virtual:solidbase-osmium/fonts.css"))
						return "\0virtual:solidbase-osmium/fonts.css";
					if (id.startsWith("virtual:solidbase-osmium/fonts"))
						return "\0virtual:solidbase-osmium/fonts";
				},
				load(id) {
					if (id.startsWith("\0virtual:solidbase-osmium/fonts.css"))
						return filteredFonts
							.map(
								(font) =>
									`@import url(${fileURLToPath(font.cssPath, { windows: false })});`
							)
							.join("\n");
					if (id.startsWith("\0virtual:solidbase-osmium/fonts")) {
						const preloadFonts = filteredFonts.map((font, i) => {
							const pathIdent = `font_${i}`;
							return {
								pathIdent,
								import: `import ${pathIdent} from "${fileURLToPath(font.preloadFontPath, { windows: false })}?url";`,
								type: font.fontType,
							};
						});

						return `
							${preloadFonts.map((f) => f.import).join("\n")}

							export const preloadFonts = [
								${preloadFonts
									.map((f) => `{ path: ${f.pathIdent}, type: "${f.type}" }`)
									.join(",")}
							];
						`;
					}
				},
			},
		];
	},
});
