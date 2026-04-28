interface ImportMetaEnv {
	readonly VITE_ORAMA_PROJECT_ID?: string;
	readonly VITE_ORAMA_PUBLIC_API_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
