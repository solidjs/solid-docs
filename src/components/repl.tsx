import { isServer } from "solid-js/web";

const stub = (() => {}) as any;
const editorWorker = isServer
  ? stub
  : await import("monaco-editor/esm/vs/editor/editor.worker?worker");
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
    getWorker: function (_moduleId: unknown, label: string) {
      switch (label) {
        case "css":
          return new cssWorker();
        case "typescript":
        case "javascript":
          return new tsWorker();
        default:
          return new editorWorker();
      }
    },
  };

export { Repl, createTabList } from "solid-repl";
export const formatter = new formatterWorker();
export const compiler = new compilerWorker();
