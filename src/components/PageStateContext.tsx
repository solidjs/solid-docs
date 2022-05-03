import { useIsRouting, useLocation } from "solid-app-router";
import { Accessor, createEffect, useContext } from "solid-js";

import {
  createContext,
  createSignal,
  PropsWithChildren,
  Signal,
} from "solid-js";

type Section = {
  title: string;
  href: string;
};

type PageStateData = {
  sections: Accessor<Section[]>;
  addSection: (title: string, href: string) => void;
};

export const PageStateContext = createContext<PageStateData>();

export const PageStateProvider = (props: PropsWithChildren) => {
  const [sections, setSections] = createSignal([]);
  const [path, setPath] = createSignal("");

  const store: PageStateData = {
    sections,
    addSection(title, href) {
      setSections((sections) => [...sections, { title, href }]);
    },
  };

  createEffect(() => {
    console.log(sections());
  });

  createEffect(() => {
    const { pathname } = useLocation();
    if (pathname !== path()) {
      setSections([]);
      setPath(pathname);
    }
  });

  return (
    <PageStateContext.Provider value={store}>
      {props.children}
    </PageStateContext.Provider>
  );
};

export function usePageState() {
  return useContext(PageStateContext);
}
