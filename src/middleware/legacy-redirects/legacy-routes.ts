/**
 * Redirect Dictionary
 * {origin: destination}
 */
export const LEGACY_ROUTES = {
	// api reference
	"/references/api-reference/basic-reactivity/createEffect":
		"/reference/basic-reactivity/create-effect",
	"/references/api-reference/basic-reactivity/createMemo":
		"/reference/basic-reactivity/create-memo",
	"/references/api-reference/basic-reactivity/createResource":
		"/reference/basic-reactivity/create-resource",
	"/references/api-reference/basic-reactivity/createSignal":
		"/reference/basic-reactivity/create-signal",
	"/references/api-reference/component-apis/children":
		"/reference/component-apis/children",
	"/references/api-reference/component-apis/createContext":
		"/reference/component-apis/create-context",
	"/references/api-reference/component-apis/createUniqueId":
		"/reference/component-apis/create-unique-id",
	"/references/api-reference/component-apis/lazy":
		"/reference/component-apis/lazy",
	"/references/api-reference/component-apis/useContext":
		"/reference/component-apis/use-context",
	"/references/api-reference/control-flow/Dynamic":
		"/reference/components/dynamic",
	"/references/api-reference/control-flow/ErrorBoundary":
		"/reference/components/error-boundary",
	"/references/api-reference/control-flow/For": "/reference/components/for",
	"/references/api-reference/control-flow/Index":
		"/reference/components/index-component",
	"/references/api-reference/control-flow/Portal":
		"/reference/components/portal",
	"/references/api-reference/control-flow/Show": "/reference/components/show",
	"/references/api-reference/control-flow/Suspense":
		"/reference/components/suspense",
	"/references/api-reference/control-flow/SuspenseList":
		"/reference/components/suspense-list",
	"/references/api-reference/control-flow/Switch-and-Match":
		"/reference/components/switch-and-match",
	"/references/api-reference/lifecycles/onCleanup":
		"/reference/lifecycle/on-cleanup",
	"/references/api-reference/lifecycles/onError":
		"/reference/reactive-utilities/catch-error",
	"/references/api-reference/lifecycles/onMount":
		"/reference/lifecycle/on-mount",
	"/references/api-reference/reactive-utilities/batch":
		"/reference/reactive-utilities/batch",
	"/references/api-reference/reactive-utilities/catchError":
		"/reference/reactive-utilities/catch-error",
	"/references/api-reference/reactive-utilities/createRoot":
		"/reference/reactive-utilities/create-root",
	"/references/api-reference/reactive-utilities/from":
		"/reference/reactive-utilities/from",
	"/references/api-reference/reactive-utilities/getOwner":
		"/reference/reactive-utilities/get-owner",
	"/references/api-reference/reactive-utilities/indexArray":
		"/reference/reactive-utilities/index-array",
	"/references/api-reference/reactive-utilities/mapArray":
		"/reference/reactive-utilities/map-array",
	"/references/api-reference/reactive-utilities/mergeProps":
		"/reference/reactive-utilities/merge-props",
	"/references/api-reference/reactive-utilities/observable":
		"/reference/reactive-utilities/observable",
	"/references/api-reference/reactive-utilities/on":
		"/reference/reactive-utilities/on",
	"/references/api-reference/reactive-utilities/regularstartTransition":
		"/reference/reactive-utilities/start-transition",
	"/references/api-reference/reactive-utilities/runWithOwner":
		"/reference/reactive-utilities/run-with-owner",
	"/references/api-reference/reactive-utilities/splitProps":
		"/reference/reactive-utilities/split-props",
	"/references/api-reference/reactive-utilities/untrack":
		"/reference/reactive-utilities/untrack",
	"/references/api-reference/reactive-utilities/useTransition":
		"/reference/reactive-utilities/use-transition",
	"/references/api-reference/rendering/DEV": "/reference/rendering/dev",
	"/references/api-reference/rendering/hydrate": "/reference/rendering/hydrate",
	"/references/api-reference/rendering/HydrationScript":
		"/reference/rendering/hydration-script",
	"/references/api-reference/rendering/isServer":
		"/reference/rendering/is-server",
	"/references/api-reference/rendering/render": "/reference/rendering/render",
	"/references/api-reference/rendering/renderToStream":
		"/reference/rendering/render-to-stream",
	"/references/api-reference/rendering/renderToString":
		"/reference/rendering/render-to-string",
	"/references/api-reference/rendering/renderToStringAsync":
		"/reference/rendering/render-to-string-async",
	"/references/api-reference/secondary-primitives/createComputed":
		"/reference/secondary-primitives/create-computed",
	"/references/api-reference/secondary-primitives/createDeferred":
		"/reference/secondary-primitives/create-deferred",
	"/references/api-reference/secondary-primitives/createReaction":
		"/reference/secondary-primitives/create-reaction",
	"/references/api-reference/secondary-primitives/createRenderEffect":
		"/reference/secondary-primitives/create-render-effect",
	"/references/api-reference/secondary-primitives/createSelector":
		"/reference/secondary-primitives/create-selector",
	"/references/api-reference/special-jsx-attributes/attr_":
		"/reference/jsx-attributes/attr",
	"/references/api-reference/special-jsx-attributes/classList":
		"/reference/jsx-attributes/classlist",
	"/references/api-reference/special-jsx-attributes/innerHTML-or-textContent":
		"/reference/jsx-attributes/innerhtml-or-textcontent",
	"/references/api-reference/special-jsx-attributes/on_":
		"/reference/jsx-attributes/on_",
	"/references/api-reference/special-jsx-attributes/on_-and-oncapture_":
		"/reference/jsx-attributes/on-and-oncapture",
	"/references/api-reference/special-jsx-attributes/once":
		"/reference/jsx-attributes/once",
	"/references/api-reference/special-jsx-attributes/prop_":
		"/reference/jsx-attributes/prop",
	"/references/api-reference/special-jsx-attributes/ref":
		"/reference/jsx-attributes/ref",
	"/references/api-reference/special-jsx-attributes/style":
		"/reference/jsx-attributes/style",
	"/references/api-reference/special-jsx-attributes/use_":
		"/reference/jsx-attributes/use",
	"/references/api-reference/stores/store-utilities":
		"/reference/stores/store-utilities",
	"/references/api-reference/stores/using-stores":
		"/reference/stores/using-stores",

	// deployment
	"/guides/how-to-guides/deployment": "/guides/deploying-your-app",
	"/guides/how-to-guides/deployment/deploying-to-cloudflare":
		"/guides/deploying-your-app#cloudflare",
	"/guides/how-to-guides/deployment/deploying-to-firebase":
		"/guides/deploying-your-app#firebase",
	"/guides/how-to-guides/deployment/deploying-to-flightcontrol":
		"/guides/deploying-your-app#aws-via-flightcontrol",
	"/guides/how-to-guides/deployment/deploying-to-netlify":
		"/guides/deploying-your-app#netlify",
	"/guides/how-to-guides/deployment/deploying-to-railway":
		"/guides/deploying-your-app#railway",
	"/guides/how-to-guides/deployment/deploying-to-vercel":
		"/guides/deploying-your-app#vercel",

	// styling
	"/guides/how-to-guides/styling-in-solid": "/guides/styling-your-components",
	"/guides/how-to-guides/styling-in-solid/sass":
		"/guides/styling-your-components#sass",
	"/guides/how-to-guides/styling-in-solid/less":
		"/guides/styling-your-components#less",
	"/guides/how-to-guides/styling-in-solid/tailwind-css":
		"/guides/styling-your-components#tailwindcss",
	"/guides/how-to-guides/styling-in-solid/css-modules":
		"/guides/styling-your-components#css-modules",
	"/guides/how-to-guides/styling-in-solid/unocss":
		"/guides/styling-your-components#unocss",

	// trailing slash removal
	"/routing/migration/": "/routing/migration",
	"/concepts/refs/": "/concepts/refs",
	"/guides/state-management/": "/guides/state-management",
} as const;
