#!/usr/bin/env node
// Type-check every ts/tsx code block in src/routes/**/*.mdx against local
// checkouts of the Solid packages, and report errors that indicate a wrong
// API shape: a renamed or missing export, a wrong subpath, a changed
// signature, a misspelled JSX prop.
//
// Most blocks are fragments. They reference stand-ins such as `database`
// or `currentCustomerId`, import app modules that do not exist, or repeat a
// declaration on their Avoid and Prefer sides. Those errors are filtered by
// diagnostic code so that what remains is worth reading.
//
// Usage:
//   node scripts/check-examples.mjs [--solid ../solid] [--router ../solid-router]
//     [--meta ../solid-meta] [--vite-plugin ../vite-plugin-solid] [--ref] [--codes]
//
//   --ref    include generated reference pages (their examples come from upstream JSDoc)
//   --codes  print a histogram of every diagnostic code seen, filtered or not

import { execFileSync } from "node:child_process";
import {
	mkdirSync,
	readFileSync,
	readdirSync,
	renameSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../..");
const args = process.argv.slice(2);
const flag = (name, fallback) => {
	const i = args.indexOf(`--${name}`);
	return i === -1 ? fallback : args[i + 1];
};
const solid = resolve(root, flag("solid", "../solid"));
const router = resolve(root, flag("router", "../solid-router"));
const meta = resolve(root, flag("meta", "../solid-meta"));
const vitePlugin = resolve(root, flag("vite-plugin", "../vite-plugin-solid"));
const includeRef = args.includes("--ref");
const showCodes = args.includes("--codes");

const work = join(tmpdir(), "solid-docs-check-examples");
const outDir = join(work, "out");
rmSync(work, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// ---------------------------------------------------------------------------
// 1. Extract blocks

function walk(dir, acc = []) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walk(p, acc);
		else if (p.endsWith(".mdx")) acc.push(p);
	}
	return acc;
}

const blocks = [];
let n = 0;
for (const file of walk(join(root, "src/routes"))) {
	const rel = relative(root, file);
	const isRef = rel.includes("/reference/");
	if (isRef && !includeRef) continue;
	const lines = readFileSync(file, "utf8").split("\n");
	for (let i = 0; i < lines.length; i++) {
		const m = /^(\s*)(`{3,}|~{3,})\s*(tsx?|typescript|jsx?)\b/.exec(lines[i]);
		if (!m) continue;
		const fence = m[2];
		const start = i + 1;
		let j = start;
		while (j < lines.length && !lines[j].trim().startsWith(fence)) j++;
		const code = lines.slice(start, j).join("\n");
		i = j;
		if (!code.trim()) continue;
		const t = code.trim();
		const declares =
			/^\s*(import|export|const|let|var|function|class|type|interface|declare|async|await|return|if|for)\b/m.test(
				code
			);
		let body = code;
		// Bare JSX with several roots, and bare object literals, are common
		// fragment shapes; wrap them so they parse.
		if (t.startsWith("<") && !declares)
			body = `const __jsx = (\n<>\n${code}\n</>\n);\n`;
		else if (t.startsWith("{") && t.endsWith("}") && !declares)
			body = `const __obj = [\n${code}\n];\n`;
		// Every block is its own module so top-level names never collide.
		if (!/^\s*(import|export)\b/m.test(body)) body += "\nexport {};\n";
		const ext = /x$/.test(m[3]) || /<[A-Za-z]/.test(code) ? "tsx" : "ts";
		const out = `${String(++n).padStart(4, "0")}.${ext}`;
		writeFileSync(join(outDir, out), body);
		blocks.push({ out, file: rel, line: start + 1, isRef, code });
	}
}

// ---------------------------------------------------------------------------
// 2. Project config: map every Solid entry point at the local checkouts

const paths = {
	"solid-js": `${solid}/packages/solid/types/index.d.ts`,
	"solid-js/refresh": `${solid}/packages/solid/types/refresh/index.d.ts`,
	"solid-js/attribution": `${solid}/packages/solid/types/attribution.d.ts`,
	"@solidjs/signals": `${solid}/packages/signals/dist/types/index.d.ts`,
	"@solidjs/web": `${solid}/packages/web/types/index.d.ts`,
	"@solidjs/web/jsx-runtime": `${solid}/packages/web/types/jsx.d.ts`,
	"@solidjs/web/jsx-dev-runtime": `${solid}/packages/web/types/jsx.d.ts`,
	"@solidjs/web/storage": `${solid}/packages/web/storage/types/index.d.ts`,
	"@solidjs/web/serialization": `${solid}/packages/web/serialization/types/index.d.ts`,
	"@solidjs/web/serialization/decode": `${solid}/packages/web/serialization/types/serializer-decode.d.ts`,
	"@solidjs/web/server-functions": `${solid}/packages/web/types/server-functions/client.d.ts`,
	"@solidjs/web/server-functions/server": `${solid}/packages/web/types/server-functions/server.d.ts`,
	"@solidjs/web/server-functions/client": `${solid}/packages/web/types/server-functions/client.d.ts`,
	"@solidjs/web/server-functions/rich-args": `${solid}/packages/web/types/server-functions/rich-args.d.ts`,
	"@solidjs/web/frames": `${solid}/packages/web/types/frames/client.d.ts`,
	"@solidjs/web/frames/server": `${solid}/packages/web/types/frames/server.d.ts`,
	"@solidjs/web/frames/client": `${solid}/packages/web/types/frames/client.d.ts`,
	"@solidjs/diagnostics": `${solid}/packages/diagnostics/dist/index.d.ts`,
	"@solidjs/diagnostics/vitest": `${solid}/packages/diagnostics/dist/vitest.d.ts`,
	"@solidjs/diagnostics/browser": `${solid}/packages/diagnostics/dist/browser.d.ts`,
	"@solidjs/diagnostics/playwright": `${solid}/packages/diagnostics/dist/playwright.d.ts`,
	"@solidjs/router": `${router}/dist/index.d.ts`,
	"@solidjs/router/server": `${router}/dist/server.d.ts`,
	"@solidjs/router/fs": `${router}/dist/fs.d.ts`,
	"@solidjs/meta": `${meta}/dist/index.d.ts`,
	"@solidjs/vite-plugin": `${vitePlugin}/dist/types/src/index.d.ts`,
	"@solidjs/vite-plugin/boundary-modules": `${vitePlugin}/boundary-modules.d.ts`,
	"@solidjs/vite-plugin/virtual-solid-manifest": `${vitePlugin}/virtual-solid-manifest.d.ts`,
};
for (const [spec, p] of Object.entries(paths)) {
	try {
		statSync(p);
	} catch {
		console.error(
			`Missing types for ${spec}: ${p}\nBuild the checkout or pass its location with a flag.`
		);
		process.exit(2);
	}
}
// Packages the docs import that are not checked out locally.
const external = new Set([
	"@solidjs/testing-library",
	"@solidjs/prerender",
	"@solidjs/prerender/integration",
]);

writeFileSync(
	join(work, "tsconfig.json"),
	JSON.stringify(
		{
			compilerOptions: {
				target: "ESNext",
				module: "ESNext",
				moduleResolution: "Bundler",
				lib: ["ESNext", "DOM", "DOM.Iterable"],
				jsx: "preserve",
				jsxImportSource: "@solidjs/web",
				strict: true,
				noEmit: true,
				skipLibCheck: true,
				types: [],
				paths: Object.fromEntries(
					Object.entries(paths).map(([k, v]) => [k, [v]])
				),
			},
			include: ["out/**/*", "globals.d.ts"],
		},
		null,
		"\t"
	)
);
// Anything else the examples import (app modules, valibot, virtual modules)
// resolves to `any`. Solid subpaths are mapped above, so a wrong one is still
// caught by the import scan below.
writeFileSync(join(work, "globals.d.ts"), 'declare module "*";\n');

// ---------------------------------------------------------------------------
// 3. Run tsc. It reports no semantic errors while any syntactic error exists,
//    so strip fragments that do not parse and rerun until the syntax pass is clean.

const tsc = join(root, "node_modules/typescript/lib/tsc.js");
function runTsc() {
	try {
		return execFileSync(
			"node",
			[tsc, "-p", join(work, "tsconfig.json"), "--pretty", "false"],
			{
				encoding: "utf8",
				maxBuffer: 1 << 28,
				cwd: work,
			}
		);
	} catch (e) {
		return String(e.stdout || "") + String(e.stderr || "");
	}
}
const errRe = /out[\\/]([^\s(]+)\((\d+),(\d+)\): error TS(\d+): (.*)$/;
const isSyntax = (code) =>
	(code >= 1000 && code < 2000) || [17008, 2657, 17002, 17015].includes(code);

const syntaxBlocks = new Set();
let output = "";
for (let pass = 0; pass < 5; pass++) {
	output = runTsc();
	let found = 0;
	for (const line of output.split("\n")) {
		const m = errRe.exec(line);
		if (m && isSyntax(Number(m[4])) && !syntaxBlocks.has(m[1])) {
			syntaxBlocks.add(m[1]);
			renameSync(join(outDir, m[1]), join(outDir, `${m[1]}.skip`));
			found++;
		}
	}
	if (!found) break;
}

// ---------------------------------------------------------------------------
// 4. Filter and report

// Diagnostics produced by a snippet being a fragment, not by a wrong API.
const NOISE = new Set([
	// cannot find name / namespace: stand-ins such as `database`
	2304, 2552, 2503, 2580, 2582, 2583, 2584, 2591, 18004,
	// redeclarations across the Avoid and Prefer sides of one block
	2451, 2300, 2393, 2323, 2395, 2440, 2391, 2390, 2717, 2371, 2564,
	// implicit any
	7006, 7031, 7034, 7005, 7008, 7010, 7011, 7019, 7022, 7023, 7051, 7053, 7017,
	7057,
	// unused
	6133, 6192, 6196, 6198,
	// module resolution handled by the wildcard; reference directives
	2307, 2688,
	// types imported from stand-in modules are `any` namespaces
	2709, 2694, 2315, 2344,
	// control flow and nullability inside fragments
	1375, 1378, 2454, 2448, 2449, 2532, 18048, 18047, 2533, 2722, 2571, 18046,
	2739, 2741, 2355, 7027, 2367, 2801, 2774, 2872, 2869, 2695, 2794, 1064, 1345,
	2792,
]);

const byOut = new Map(blocks.map((b) => [b.out, b]));
const perBlock = new Map();
const codes = new Map();
let lastKey = null;
for (const line of output.split("\n")) {
	const m = errRe.exec(line);
	if (!m) {
		if (lastKey && /^\s+/.test(line))
			perBlock.get(lastKey).at(-1).msg += " " + line.trim();
		continue;
	}
	const [, out, ln, , codeS, msg] = m;
	const code = Number(codeS);
	codes.set(code, (codes.get(code) || 0) + 1);
	if (isSyntax(code) || NOISE.has(code)) {
		lastKey = null;
		continue;
	}
	if (!perBlock.has(out)) perBlock.set(out, []);
	perBlock.get(out).push({ ln: Number(ln), code, msg });
	lastKey = out;
}

let errors = 0;
const seenBlocks = new Set();
for (const [out, errs] of [...perBlock.entries()].sort()) {
	const b = byOut.get(out);
	const src = b.code.split("\n");
	for (const e of errs) {
		const srcLine = src[e.ln - 1] || "";
		// Deliberate type errors are annotated inline in the docs.
		if (/\/\/.*(not assignable|is missing|does not exist|Type ')/.test(srcLine))
			continue;
		// Stand-in modules resolve to any, so action(fn) loses its FormData shape.
		if (e.code === 2322 && /Action<any\[\]/.test(e.msg)) continue;
		// Migration pages quote removed APIs on their "before" side.
		if (
			/\(\d+\)migration\//.test(b.file) &&
			(e.code === 2305 || e.code === 2724)
		)
			continue;
		if (!seenBlocks.has(out)) {
			seenBlocks.add(out);
			console.log(`\n${b.file}:${b.line}`);
		}
		errors++;
		console.log(`  L${b.line + e.ln - 1} TS${e.code}: ${e.msg}`);
		console.log(`      | ${srcLine.trim().slice(0, 140)}`);
	}
}

// Solid subpaths the wildcard fallback would otherwise mask.
const known = new Set([...Object.keys(paths), ...external]);
const badImports = [];
for (const b of blocks) {
	if (/\(\d+\)migration\//.test(b.file)) continue;
	for (const im of b.code.matchAll(
		/from\s+["']((?:solid-js|@solidjs\/)[^"']*)["']/g
	)) {
		if (!known.has(im[1])) badImports.push(`${b.file}:${b.line}  ${im[1]}`);
	}
}
if (badImports.length) {
	console.log("\nSolid imports with no matching entry point:");
	for (const line of badImports) console.log(`  ${line}`);
}

console.log(
	`\n${errors} error(s) in ${seenBlocks.size} block(s); ${blocks.length} block(s) checked, ${syntaxBlocks.size} skipped as fragments that do not parse`
);
if (showCodes) {
	console.log(
		[...codes.entries()]
			.sort((a, b) => b[1] - a[1])
			.map(([c, k]) => `TS${c}:${k}`)
			.join(" ")
	);
}
process.exit(errors || badImports.length ? 1 : 0);
