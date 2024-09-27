import { createContext, ParentProps, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

type ChildSection = {
	text: string | undefined;
	id: string;
	level: number;
};

type ParentSection = {
	text: string | undefined;
	id: string;
	level: number;
	children: ChildSection[] | [];
};

type PageStateStore = {
	sections: ParentSection[];
	path: string;
};

const INITIAL_PAGE_STATE_STORE = {
	sections: [],
	path: "",
};

const PageStateContext = createContext<{
	pageSections: PageStateStore;
	setPageSections: SetStoreFunction<PageStateStore>;
}>({
	pageSections: INITIAL_PAGE_STATE_STORE,
	setPageSections: () => {},
});

const PageStateProvider = (props: ParentProps) => {
	const [pageSections, setPageSections] = createStore<PageStateStore>(
		INITIAL_PAGE_STATE_STORE
	);

	return (
		<PageStateContext.Provider
			value={{
				pageSections,
				setPageSections,
			}}
		>
			{props.children}
		</PageStateContext.Provider>
	);
};

function usePageState() {
	return useContext(PageStateContext);
}

export { PageStateProvider, usePageState };
