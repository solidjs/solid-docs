import { useLocation } from "solid-start";
import { createEffect, createContext, ParentProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";

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

const PageStateContext = createContext();

const PageStateProvider = (props: ParentProps) => {
	const location = useLocation();
	const [pageSections, setPageSections] = createStore<PageStateStore>({
		sections: [],
		path: "",
	});

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
