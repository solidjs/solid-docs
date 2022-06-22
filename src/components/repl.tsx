import { createSignal } from "solid-js";
import { isServer } from "solid-js/web";

const stub = Promise.resolve({ default: function () {} as any });
const editorWorker = isServer
  ? stub
  : import("monaco-editor/esm/vs/editor/editor.worker?worker");
const tsWorker = isServer
  ? stub
  : import("monaco-editor/esm/vs/language/typescript/ts.worker?worker");
const cssWorker = isServer
  ? stub
  : import("monaco-editor/esm/vs/language/css/css.worker?worker");
const formatterWorker = isServer
  ? stub
  : import("solid-repl/lib/formatter?worker");
const compilerWorker = isServer
  ? stub
  : import("solid-repl/lib/compiler?worker");

if (!isServer)
  (window as any).MonacoEnvironment = {
    async getWorker(_moduleId: unknown, label: string) {
      switch (label) {
        case "css":
          return new (await cssWorker).default();
        case "typescript":
        case "javascript":
          return new (await tsWorker).default();
        default:
          return new (await editorWorker).default();
      }
    },
  };

const srepl = isServer ? undefined : import("solid-repl");

const Repl = isServer ? () => {} : (await srepl).Repl;
const createTabList = isServer
  ? () => [() => {}, () => {}]
  : (await srepl).createTabList;
const defaultTabs = isServer ? [] : (await srepl).defaultTabs;
const formatter = new (await formatterWorker).default();
const compiler = new (await compilerWorker).default();

import "solid-repl/lib/bundle.css";

export const MyRepl = () => {
  const [tabs, setTabs] = createTabList(defaultTabs);
  const [current, setCurrent] = createSignal("main.tsx");

  return (
    <Repl
      isHorizontal={false}
      dark={false}
      interactive
      editableTabs
      actionBar
      id="HI"
      tabs={tabs()}
      current={current()}
      setCurrent={setCurrent}
      setTabs={setTabs}
      compiler={compiler}
      formatter={formatter}
    />
  );
};
