interface ImportMetaEnv {
	readonly VITE_ORAMA_PROJECT_ID?: string;
	readonly VITE_ORAMA_PUBLIC_API_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
	interface ProcessEnv {
		readonly ORAMA_PROJECT_ID: string;
		readonly ORAMA_DATASOURCE_ID: string;
		readonly ORAMA_PRIVATE_API_KEY: string;
		readonly SITE_URL?: string;
		readonly DEPLOY_PRIME_URL?: string;
	}
}
