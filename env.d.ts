interface ImportMetaEnv {
	readonly VITE_ORAMA_ENDPOINT: string;
	readonly VITE_ORAMA_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
