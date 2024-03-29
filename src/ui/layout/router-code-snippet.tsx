import { codeToHtml } from "shiki";
import { createResource } from "solid-js";

export const routerTxt = `import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import Home from "./pages/Home";
import Users from "./pages/Users";

render(() => (
  <Router>
    <Route path="/users" component={Users} />
    <Route path="/" component={Home} />
  </Router>
), document.getElementById("app"));`;

export const routerSnippetLines = routerTxt.split("\n");

const renderCode = async () => {
	const code = `import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
    
import Home from "./pages/Home";
import Users from "./pages/Users";
    
render(() => (
  <Router>
    <Route path="/users" component={Users} />
    <Route path="/" component={Home} />
  </Router>
), document.getElementById("app"));`.trim();
	return codeToHtml(code, {
		lang: "tsx",
		theme: "material-theme-ocean",
	});
};

export default function RouterCodeSnippet() {
	const [code] = createResource(renderCode);

	return <div innerHTML={code()} />;
}
