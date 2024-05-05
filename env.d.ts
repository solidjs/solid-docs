interface ImportMetaEnv {
	readonly VITE_ORAMA_ENDPOINT: string;
	readonly VITE_ORAMA_API_KEY: string;
	readonly VITE_ORAMA_SECURE_PROXY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
