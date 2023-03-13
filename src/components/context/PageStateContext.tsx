import { useLocation } from "@solidjs/router";
import { createEffect, useContext } from "solid-js";

import { createContext, ParentProps } from "solid-js";
import { createStore } from "solid-js/store";

type SectionTitle = string | Element

type Section = {
  title: SectionTitle | SectionTitle[];
  href: string;
};

type PageStateData = {
  sections: () => readonly Section[];
  addSection: (title: string, href: string) => void;
};

export const PageStateContext = createContext<PageStateData>();

export const PageStateProvider = (props: ParentProps) => {
  const [store, setStore] = createStore<{ sections: Section[]; path: string }>({
    sections: [],
    path: "",
  });

  const data: PageStateData = {
    sections() {
      return store.sections;
    },
    addSection(title, href) {
      setStore("sections", (sections) => [
        ...new Set([...sections, { title, href }]),
      ]);
    },
  };

  createEffect(() => {
    const { pathname } = useLocation();
    setStore("sections", []);
    setStore("path", pathname);
  });

  return (
    <PageStateContext.Provider value={data}>
      {props.children}
    </PageStateContext.Provider>
  );
};

export function usePageState() {
  return useContext(PageStateContext);
}
