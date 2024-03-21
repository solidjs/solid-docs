import { redirect } from "@solidjs/router";
import { type FetchEvent } from "@solidjs/start/server";

/**
 * Redirect Dictionary
 * {origin: destination}
 */
const LEGACY_ROUTES = {

	// api reference
	"/references/api-reference/basic-reactivity/createEffect": "/solid-js/reference/basic-reactivity/create-effect",
	"/references/api-reference/basic-reactivity/createMemo": "/solid-js/reference/basic-reactivity/create-memo",
	"/references/api-reference/basic-reactivity/createResource": "/solid-js/reference/basic-reactivity/create-resource",
	"/references/api-reference/basic-reactivity/createSignal": "/solid-js/reference/basic-reactivity/create-signal",
	"/references/api-reference/component-apis/children": "/solid-js/reference/component-apis/children",
	"/references/api-reference/component-apis/createContext": "/solid-js/reference/component-apis/create-context",
	"/references/api-reference/component-apis/createUniqueId": "/solid-js/reference/component-apis/create-unique-id",
	"/references/api-reference/component-apis/lazy": "/solid-js/reference/component-apis/lazy",
	"/references/api-reference/component-apis/useContext": "/solid-js/reference/component-apis/use-context",
	"/references/api-reference/control-flow/Dynamic": "/solid-js/reference/components/dynamic",
	"/references/api-reference/control-flow/ErrorBoundary": "/solid-js/reference/components/error-boundary",
	"/references/api-reference/control-flow/For": "/solid-js/reference/components/for",
	"/references/api-reference/control-flow/Index": "/solid-js/reference/components/index-component",
	"/references/api-reference/control-flow/Portal": "/solid-js/reference/components/portal",
	"/references/api-reference/control-flow/Show": "/solid-js/reference/components/show",
	"/references/api-reference/control-flow/Suspense": "/solid-js/reference/components/suspense",
	"/references/api-reference/control-flow/SuspenseList": "/solid-js/reference/components/suspense-list",
	"/references/api-reference/control-flow/Switch-and-Match": "/solid-js/reference/components/switch-and-match",
	"/references/api-reference/lifecycles/onCleanup": "/solid-js/reference/lifecycle/on-cleanup",
	"/references/api-reference/lifecycles/onError": "/solid-js/reference/reactive-utilities/catch-error",
	"/references/api-reference/lifecycles/onMount": "/solid-js/reference/lifecycle/on-mount",
	"/references/api-reference/reactive-utilities/batch": "/solid-js/reference/reactive-utilities/batch",
	"/references/api-reference/reactive-utilities/catchError": "/solid-js/reference/reactive-utilities/catch-error",
	"/references/api-reference/reactive-utilities/createRoot": "/solid-js/reference/reactive-utilities/create-root",
	"/references/api-reference/reactive-utilities/from": "/solid-js/reference/reactive-utilities/from",
	"/references/api-reference/reactive-utilities/getOwner": "/solid-js/reference/reactive-utilities/get-owner",
	"/references/api-reference/reactive-utilities/indexArray": "/solid-js/reference/reactive-utilities/index-array",
	"/references/api-reference/reactive-utilities/mapArray": "/solid-js/reference/reactive-utilities/map-array",
	"/references/api-reference/reactive-utilities/mergeProps": "/solid-js/reference/reactive-utilities/merge-props",
	"/references/api-reference/reactive-utilities/observable": "/solid-js/reference/reactive-utilities/observable",
	"/references/api-reference/reactive-utilities/on": "/solid-js/reference/reactive-utilities/on",
	"/references/api-reference/reactive-utilities/regularstartTransition": "/solid-js/reference/reactive-utilities/start-transition",
	"/references/api-reference/reactive-utilities/runWithOwner": "/solid-js/reference/reactive-utilities/run-with-owner",
	"/references/api-reference/reactive-utilities/splitProps": "/solid-js/reference/reactive-utilities/split-props",
	"/references/api-reference/reactive-utilities/untrack": "/solid-js/reference/reactive-utilities/untrack",
	"/references/api-reference/reactive-utilities/useTransition": "/solid-js/reference/reactive-utilities/use-transition",
	"/references/api-reference/rendering/DEV": "/solid-js/reference/rendering/dev",
	"/references/api-reference/rendering/hydrate": "/solid-js/reference/rendering/hydrate",
	"/references/api-reference/rendering/HydrationScript": "/solid-js/reference/rendering/hydration-script",
	"/references/api-reference/rendering/isServer": "/solid-js/reference/rendering/is-server",
	"/references/api-reference/rendering/render": "/solid-js/reference/rendering/render",
	"/references/api-reference/rendering/renderToStream": "/solid-js/reference/rendering/render-to-stream",
	"/references/api-reference/rendering/renderToString": "/solid-js/reference/rendering/render-to-string",
	"/references/api-reference/rendering/renderToStringAsync": "/solid-js/reference/rendering/render-to-string-async",
	"/references/api-reference/secondary-primitives/createComputed": "/solid-js/reference/secondary-primitives/create-computed",
	"/references/api-reference/secondary-primitives/createDeferred": "/solid-js/reference/secondary-primitives/create-deferred",
	"/references/api-reference/secondary-primitives/createReaction": "/solid-js/reference/secondary-primitives/create-reaction",
	"/references/api-reference/secondary-primitives/createRenderEffect": "/solid-js/reference/secondary-primitives/create-render-effect",
	"/references/api-reference/secondary-primitives/createSelector": "/solid-js/reference/secondary-primitives/create-selector",
	"/references/api-reference/special-jsx-attributes/attr_": "/solid-js/reference/jsx-attributes/attr",
	"/references/api-reference/special-jsx-attributes/classList": "/solid-js/reference/jsx-attributes/classlist",
	"/references/api-reference/special-jsx-attributes/innerHTML-or-textContent": "/solid-js/reference/jsx-attributes/innerhtml-or-textcontent",
	"/references/api-reference/special-jsx-attributes/on_": "/solid-js/reference/jsx-attributes/on_",
	"/references/api-reference/special-jsx-attributes/on_-and-oncapture_": "/solid-js/reference/jsx-attributes/on-and-oncapture",
	"/references/api-reference/special-jsx-attributes/once": "/solid-js/reference/jsx-attributes/once",
	"/references/api-reference/special-jsx-attributes/prop_": "/solid-js/reference/jsx-attributes/prop",
	"/references/api-reference/special-jsx-attributes/ref": "/solid-js/reference/jsx-attributes/ref",
	"/references/api-reference/special-jsx-attributes/style": "/solid-js/reference/jsx-attributes/style",
	"/references/api-reference/special-jsx-attributes/use_": "/solid-js/reference/jsx-attributes/use",
	"/references/api-reference/stores/store-utilities": "/solid-js/concepts/stores#store-utilities",
	"/references/api-reference/stores/using-stores": "/solid-js/concepts/stores",

	// deployment
	"/guides/how-to-guides/deployment": "/solid-js/guides/deploying-your-app",
	"/guides/how-to-guides/deployment/deploying-to-cloudflare": "/solid-js/guides/deployment-options/cloudflare",
	"/guides/how-to-guides/deployment/deploying-to-firebase": "/solid-js/guides/deployment-options/firebase",
	"/guides/how-to-guides/deployment/deploying-to-flightcontrol": "/solid-js/guides/deployment-options/aws-via-flightcontrol",
	"/guides/how-to-guides/deployment/deploying-to-netlify": "/solid-js/guides/deployment-options/netlify",
	"/guides/how-to-guides/deployment/deploying-to-railway": "/solid-js/guides/deployment-options/railway",
	"/guides/how-to-guides/deployment/deploying-to-vercel": "/solid-js/guides/deployment-options/vercel",

	// styling
	"/guides/how-to-guides/styling-in-solid": "/solid-js/guides/styling-your-components",
	"/guides/how-to-guides/styling-in-solid/sass": "/solid-js/guides/styling-components/sass",
	"/guides/how-to-guides/styling-in-solid/less": "/solid-js/guides/styling-components/less",
	"/guides/how-to-guides/styling-in-solid/tailwind-css": "/solid-js/guides/styling-components/tailwind",
	"/guides/how-to-guides/styling-in-solid/css-modules": "/solid-js/guides/styling-components/css-modules",
	"/guides/how-to-guides/styling-in-solid/unocss": "/solid-js/guides/styling-components/uno",

	// trailing slash removal
	"/routing/migration/": "/routing/migration",
	"/concepts/refs/": "/solid-js/concepts/refs",
	"/guides/state-management/": "/solid-js/guides/state-management",

	// miscellaneous
	"/guides/foundations/typescript-for-solid": "/solid-js/configuration/typescript",
	"/guides/foundations/understanding-components": "/solid-js/concepts/components/basics",
	"/guides/foundations/why-solid": "/#advantages-of-using-solid",
	"/guides/how-to-guides/routing-in-solid/solid-router": "/routing/installation-and-setup",
	"/guides/tutorials/getting-started-with-solid/installing-solid": "/quick-start",
	"/references/concepts/reactivity": "/solid-js/concepts/intro-to-reactivity",
	"/references/concepts/reactivity/tracking": "/solid-js/concepts/intro-to-reactivity#subscribers",
	"/references/concepts/ssr/async-ssr": "/solid-js/guides/fetching-data",
	"/references/concepts/ssr/simple-client-fetching-ssr": "/solid-js/guides/fetching-data",
	"/references/concepts/state-management/context": "/solid-js/guides/complex-state-management#state-sharing"

} as const;

function isLegacyRoute(path: string): path is keyof typeof LEGACY_ROUTES {
	return path in LEGACY_ROUTES;
}

export const handleLegacyRoutes = (event: FetchEvent) => {
	const { pathname } = new URL(event.request.url);

	if (isLegacyRoute(pathname)) {
		return redirect(LEGACY_ROUTES[pathname], 301);
	}
};
