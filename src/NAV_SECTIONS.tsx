export type SECTION_LEAF_PAGE = {
	name: string
	link: string
}

export type SECTION_PAGE = {
	name: string
	pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>
	link?: string
}

export type SECTIONS = {
	[key: string]: {
		name: string
		// If this exists, then when the user clicks on the name of the section, it will direct here
		link?: string
		pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>
	}
}

export const REFERENCE_SECTIONS: SECTIONS = {
	references: {
		name: "Welcome",
		pages: [
			{
				name: "Introduction",
				link: "/reference/",
			},
		],
	},
	// concepts: {
	// 	name: "Concepts",
	// 	pages: [
	// 		{
	// 			name: "Reactivity",
	// 			pages: [
	// 				{
	// 					name: "What is Reactivity",
	// 					link: "/concepts/reactivity",
	// 				},
	// 				{
	// 					name: "Tracking",
	// 					link: "/concepts/reactivity/tracking",
	// 				},
	// 			],
	// 		},
	// {
	//   name: "State Management",
	//   pages: [
	//     {
	//       name: "Context",
	//       link: "/concepts/state-management/context",
	//     },
	// {
	//   name: "Store",
	//   link: "/concepts/state-management/store",
	// },
	//   ],
	// },
	// 		{
	// 			name: "Server Side Rendering (SSR)",
	// 			pages: [
	// 				{
	// 					name: "Simple/Client-fetching SSR",
	// 					link: "/concepts/ssr/simple-client-fetching-ssr",
	// 				},
	// 				{
	// 					name: "Async SSR",
	// 					link: "/concepts/ssr/async-ssr",
	// 				},
	// 				{
	// 					name: "Streaming",
	// 					link: "/concepts/ssr/streaming",
	// 				},
	// 				{
	// 					name: "Static Site Generation (SSG)",
	// 					link: "/concepts/ssr/ssg",
	// 				},
	// 				{
	// 					name: "Hydration",
	// 					link: "/concepts/ssr/hydration",
	// 				},
	// 			],
	// 		},
	// 	],
	// },
	api: {
		name: "API",
		pages: [
			{
				name: "Reactivity Functions",
				pages: [
					{
						name: "createSignal",
						link: "/reference/createSignal",
					},
					{
						name: "createEffect",
						link: "/reference/createEffect",
					},
					{
						name: "createMemo",
						link: "/reference/createMemo",
					},
					{
						name: "createResource",
						link: "/reference/createResource",
					},
				],
			},
			{
				name: "Lifecycles",
				pages: [
					{
						name: "onMount",
						link: "/reference/onMount",
					},
					{
						name: "onCleanup",
						link: "/reference/onCleanup",
					},
					{
						name: "onError",
						link: "/reference/onError",
					},
				],
			},
			{
				name: "Reactive Utilities",
				pages: [
					{
						name: "untrack",
						link: "/reference/untrack",
					},
					{
						name: "batch",
						link: "/reference/batch",
					},
					{
						name: "createRoot",
						link: "/reference/createRoot",
					},
					{
						name: "getOwner",
						link: "/reference/getOwner",
					},
					{
						name: "runWithOwner",
						link: "/reference/runWithOwner",
					},
					{
						name: "mergeProps",
						link: "/reference/mergeProps",
					},
					{
						name: "splitProps",
						link: "/reference/splitProps",
					},
					{
						name: "useTransition",
						link: "/reference/useTransition",
					},
					{
						name: "startTransition",
						link: "/reference/regularstartTransition",
					},
					{
						name: "observable",
						link: "/reference/observable",
					},
					{
						name: "on()",
						link: "/reference/on",
					},
					{
						name: "from",
						link: "/reference/from",
					},
					{
						name: "mapArray",
						link: "/reference/mapArray",
					},
					{
						name: "indexArray",
						link: "/reference/indexArray",
					},
				],
			},
			{
				name: "Stores",
				pages: [
					{
						name: "Stores",
						link: "/reference/using-stores",
					},
					{
						name: "Store Utilities",
						link: "/reference/store-utilities",
					},
				],
			},
			{
				name: "Component APIs",
				pages: [
					{
						name: "createContext",
						link: "/reference/createContext",
					},
					{
						name: "useContext",
						link: "/reference/useContext",
					},
					{
						name: "children",
						link: "/reference/children",
					},
					{
						name: "lazy",
						link: "/reference/lazy",
					},
					{
						name: "createUniqueId",
						link: "/reference/createUniqueId",
					},
				],
			},
			{
				name: "Secondary Primitives",
				pages: [
					{
						name: "createDeferred",
						link: "/reference/createDeferred",
					},
					{
						name: "createComputed",
						link: "/reference/createComputed",
					},
					{
						name: "createRenderEffect",
						link: "/reference/createRenderEffect",
					},
					{
						name: "createReaction",
						link: "/reference/createReaction",
					},
					{
						name: "createSelector",
						link: "/reference/createSelector",
					},
				],
			},
			{
				name: "Rendering",
				pages: [
					{
						name: "render",
						link: "/reference/render",
					},
					{
						name: "hydrate",
						link: "/reference/hydrate",
					},
					{
						name: "renderToString",
						link: "/reference/renderToString",
					},
					{
						name: "renderToStringAsync",
						link: "/reference/renderToStringAsync",
					},
					{
						name: "renderToStream",
						link: "/reference/renderToStream",
					},
					{
						name: "isServer",
						link: "/reference/isServer",
					},
					{
						name: "DEV",
						link: "/reference/DEV",
					},
					{
						name: "HydrationScript",
						link: "/reference/HydrationScript",
					},
				],
			},
			{
				name: "Control Flow",
				pages: [
					{
						name: "<For>",
						link: "/reference/For",
					},
					{
						name: "<Show>",
						link: "/reference/Show",
					},
					{
						name: "<Switch> and <Match>",
						link: "/reference/Switch-and-Match",
					},
					{
						name: "<Index>",
						link: "/reference/Index",
					},
					{
						name: "<ErrorBoundary>",
						link: "/reference/ErrorBoundary",
					},
					{
						name: "<Suspense>",
						link: "/reference/Suspense",
					},
					{
						name: "<SuspenseList>",
						link: "/reference/SuspenseList",
					},
					{
						name: "<Dynamic>",
						link: "/reference/Dynamic",
					},
					{
						name: "<Portal>",
						link: "/reference/Portal",
					},
				],
			},
			{
				name: "Special JSX Attributes",
				pages: [
					{
						name: "ref",
						link: "/reference/ref",
					},
					{
						name: "classList",
						link: "/reference/classList",
					},
					{
						name: "style",
						link: "/reference/style",
					},
					{
						name: "innerHTML/textContent",
						link: "/reference/innerHTML-or-textContent",
					},
					{
						name: "on*",
						link: "/reference/on_",
					},
					{
						name: "on:* and oncapture:*",
						link: "/reference/on-and-oncapture",
					},
					{
						name: "use:*",
						link: "/reference/use",
					},
					{
						name: "prop:*",
						link: "/reference/prop",
					},
					{
						name: "attr:*",
						link: "/reference/attr_",
					},
					{
						name: "/*@once*/",
						link: "/reference/once",
					},
				],
			},
		],
	},
}

export const LEARN_SECTIONS: SECTIONS = {
	introduction: {
		name: "Introduction",
		pages: [
			{
				name: "Overview",
				link: "/",
			},
			{
				name: "Quick Start Guide",
				link: "/quick-start",
			},
			//   {
			//     name: "FAQ",
			//     link: "/faq",
			//   },
		],
	},
	tutorials: {
		name: "Tutorials",
		pages: [
			{
				name: "Solid Foundations",
				link: "https://www.solidjs.com/tutorial/introduction_basics",
			},
			//   {
			// 	name: "Build a Book Shelf",
			// 	link: "/tutorials/book-shelf"
			//   }
		],
	},
	concepts: {
		name: "Concepts",
		pages: [
			{
				name: "Understanding JSX",
				link: "/concepts/understanding-jsx",
			},
			{
				name: "Intro to Reactivity",
				link: "/concepts/intro-to-reactivity",
			},
			{
				name: "Components",
				pages: [
					{
						name: "Component Basics",
						link: "/concepts/components/basics",
					},
					{
						name: "Class & Style",
						link: "/concepts/components/class-style",
					},
					{
						name: "Event Handling",
						link: "/concepts/components/event-handlers",
					},
					{
						name: "Props",
						link: "/concepts/components/props",
					},
				],
			},

			{
				name: "Signals",
				link: "/concepts/signals",
			},
			{
				name: "Control Flow",
				pages: [
					{
						name: "Conditional Rendering",
						link: "/concepts/control-flow/conditional-rendering",
					},
					{
						name: "Dynamic",
						link: "/concepts/control-flow/dynamic",
					},
					{
						name: "List Rendering",
						link: "/concepts/control-flow/list-rendering",
					},
					{
						name: "Portal",
						link: "/concepts/control-flow/portal",
					},
					{
						name: "Error Boundary",
						link: "/concepts/control-flow/error-boundary",
					},
				],
			},
			{
				name: "Side Effects",
				link: "/concepts/effects",
			},
			{
				name: "Derived Values",
				pages: [
					{
						name: "Derived Signals",
						link: "/concepts/derived-values/derived-signals",
					},
					{
						name: "Memos",
						link: "/concepts/derived-values/memos",
					},
				],
			},
			{
				name: "Context",
				link: "/concepts/context",
			},
			{
				name: "Refs",
				link: "/concepts/refs",
			},
			{
				name: "Stores",
				link: "/concepts/stores",
			},
		],
	},
	advanced: {
		name: "Advanced Concepts",
		pages: [
			{
				name: "Fine-Grained Reactivity",
				link: "/advanced/fine-grained-reactivity",
			},
		],
	},
	guides: {
		name: "Guides",
		pages: [
			{
				name: "Styling your Components",
				link: "/guides/styling-your-components",
			},
			{
				name: "State Management",
				link: "/guides/state-management",
			},
			{
				name: "Fetching Data",
				link: "/guides/fetching-data",
			},
			{
				name: "Routing & Navigation",
				link: "/guides/routing-and-navigation",
			},
			{
				name: "Complex State Management",
				link: "/guides/complex-state-management",
			},
			{
				name: "Deploying your App",
				link: "/guides/deploying-your-app",
			},
			//   {
			//     name: "Testing",
			//     link: "/guides/testing",
			//   },
		],
	},
	configuration: {
		name: "Configuration",
		pages: [
			{
				name: "TypeScript",
				link: "/configuration/typescript",
			},
			{
				name: "Environment Variables",
				link: "/configuration/environment-variables",
			},
		],
	},
	community: {
		name: "Community",
		pages: [
			{
				name: "The Solid Ecosystem",
				link: "https://www.solidjs.com/ecosystem",
			},
			{
				name: "Contribution Guide",
				link: "https://github.com/solidjs/solid-docs-next/blob/main/CONTRIBUTING.md",
			},
			{
				name: "Our Open Collective",
				link: "https://opencollective.com/solid",
			},
			{
				name: "SolidJS on GitHib",
				link: "https://github.com/solidjs",
			},
		],
	},
}
