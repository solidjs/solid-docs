interface ImportMetaEnv {
	readonly VITE_ORAMA_ENDPOINT: string;
	readonly VITE_ORAMA_API_KEY: string;
	readonly VITE_ORAMA_SECURE_PROXY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
	interface ProcessEnv {
		readonly ORAMA_PROJECT_ID: string;
		readonly ORAMA_DATASOURCE_ID: string;
		readonly ORAMA_PUBLIC_API_KEY: string;
		readonly ORAMA_PRIVATE_API_KEY: string;
	}
}

declare module "solid:collection" {
	// eslint-disable-next-line
	const component: any;
	export default component;
}

declare module "solid:hero-code-snippet" {
	export const highlightedCode: string;
}
