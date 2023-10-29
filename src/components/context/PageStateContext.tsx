import { useLocation } from "@solidjs/router"
import { createEffect, useContext } from "solid-js"

import { createContext, ParentProps } from "solid-js"
import { createStore } from "solid-js/store"

type Section = {
  title: string;
  href: string;
  level: number;
};

type PageStateData = {
  sections: () => readonly Section[];
  addSection: (title: string, href: string, level: number) => void;
};

export const PageStateContext = createContext<PageStateData>()

export const PageStateProvider = (props: ParentProps) => {
	const [store, setStore] = createStore({
		sections: [],
		path: "",
		level: null,
	})

	const data: PageStateData = {
		sections() {
			return store.sections
		},
		addSection(title, href, level) {
			setStore("sections", (sections) => [
				...new Set([...sections, { title, href, level }]),
			])
		},
	}

	createEffect(() => {
		const { pathname } = useLocation()
		setStore("sections", [])
		setStore("path", pathname)
	})

	return (
		<PageStateContext.Provider value={data}>
			{props.children}
		</PageStateContext.Provider>
	)
}

export function usePageState() {
	return useContext(PageStateContext)
}
