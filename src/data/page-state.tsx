import { useLocation } from "solid-start";
import { createEffect, createContext, ParentProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";

type ChildSection = {
	title: string;
	id: string;
	level: number;
};

type ParentSection = {
	title: string;
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

	const addSection = (title: string, level: number) => {
		const id = title.replace(/\s+/g, "-").toLowerCase();

		if (level === 2) {
			setPageSections("sections", pageSections.sections.length, {
				title,
				level,
				id,
				children: [],
			});
		} else if (level === 3) {
			for (let i = pageSections.sections.length - 1; i >= 0; i--) {
				if (pageSections.sections[i].level === 2) {
					setPageSections(
						"sections",
						i,
						"children",
						pageSections.sections[i].children.length,
						{
							title,
							id,
							level,
						}
					);
				}
				break;
			}
		}
	};

	createEffect(() => {
		if (location.pathname !== pageSections.path) {
			console.log(
				"location",
				location.pathname,
				"pageSections",
				pageSections.sections
			);
			setPageSections({
				sections: [],
				path: location.pathname,
			});
		}
	});

	return (
		<PageStateContext.Provider
			value={{
				pageSections,
				setPageSections,
				addSection,
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
