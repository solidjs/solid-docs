import { useIsRouting, useLocation } from "solid-app-router";
import { Accessor, createEffect, useContext } from "solid-js";

import {
  createContext,
  createSignal,
  PropsWithChildren,
  Signal,
} from "solid-js";
import { createStore } from "solid-js/store";

type Section = {
  title: string;
  href: string;
};

type PageStateData = {
  sections: () => readonly Section[];
  addSection: (title: string, href: string) => void;
};

export const PageStateContext = createContext<PageStateData>();

export const PageStateProvider = (props: PropsWithChildren) => {
  const [store, setStore] = createStore<{ sections: Section[]; path: string }>({
    sections: [],
    path: "",
  });

  const data: PageStateData = {
    sections() {
      return store.sections;
    },
    addSection(title, href) {
      setStore("sections", (sections) => [...sections, { title, href }]);
    },
  };

  createEffect(() => {
    console.log(store.sections);
  });

  createEffect(() => {
    const { pathname } = useLocation();
    if (pathname !== store.path) {
      setStore("sections", []);
      setStore("path", pathname);
    }
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
