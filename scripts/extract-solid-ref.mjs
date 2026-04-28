#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const REPO_URL = "https://github.com/solidjs/solid.git";
const DEFAULT_SOURCE = "/tmp/solid-v2-source";
const DEFAULT_OUT = "src/routes/v2/reference";
const DEFAULT_REF = "next";
const SPARSE_PATHS = [
	"packages/solid",
	"packages/solid-web",
	"packages/solid-signals",
	"documentation/solid-2.0",
];

const ENTRYPOINTS = [
	{
		packageName: "solid-js",
		path: "packages/solid/src/index.ts",
	},
	{
		packageName: "@solidjs/web",
		path: "packages/solid-web/src/index.ts",
	},
	{
		packageName: "@solidjs/signals",
		path: "packages/solid-signals/src/index.ts",
	},
];

const ROUTES = {
	action: ["actions/action.mdx", "Actions"],
	createOptimistic: ["actions/create-optimistic.mdx", "Actions"],
	createOptimisticStore: ["actions/create-optimistic-store.mdx", "Actions"],

	createEffect: ["basic-reactivity/create-effect.mdx", "Basic Reactivity"],
	createMemo: ["basic-reactivity/create-memo.mdx", "Basic Reactivity"],
	createSignal: ["basic-reactivity/create-signal.mdx", "Basic Reactivity"],

	children: ["component-apis/children.mdx", "Component APIs"],
	createComponent: ["component-apis/create-component.mdx", "Component APIs"],
	createContext: ["component-apis/create-context.mdx", "Component APIs"],
	createUniqueId: ["component-apis/create-unique-id.mdx", "Component APIs"],
	lazy: ["component-apis/lazy.mdx", "Component APIs"],
	useContext: ["component-apis/use-context.mdx", "Component APIs"],

	Dynamic: ["components/dynamic.mdx", "Components"],
	dynamic: ["components/dynamic.mdx", "Components"],
	Errored: ["components/errored.mdx", "Components"],
	For: ["components/for.mdx", "Components"],
	Loading: ["components/loading.mdx", "Components"],
	Match: ["components/switch-and-match.mdx", "Components"],
	NoHydration: ["components/no-hydration.mdx", "Components"],
	Portal: ["components/portal.mdx", "Components"],
	Repeat: ["components/repeat.mdx", "Components"],
	Reveal: ["components/reveal.mdx", "Components"],
	Show: ["components/show.mdx", "Components"],
	Switch: ["components/switch-and-match.mdx", "Components"],

	flush: ["reactive-utilities/flush.mdx", "Reactive Utilities"],
	getObserver: ["reactive-utilities/get-observer.mdx", "Reactive Utilities"],
	getOwner: ["reactive-utilities/get-owner.mdx", "Reactive Utilities"],
	isPending: ["reactive-utilities/is-pending.mdx", "Reactive Utilities"],
	isRefreshing: ["reactive-utilities/is-refreshing.mdx", "Reactive Utilities"],
	latest: ["reactive-utilities/latest.mdx", "Reactive Utilities"],
	mapArray: ["reactive-utilities/map-array.mdx", "Reactive Utilities"],
	refresh: ["reactive-utilities/refresh.mdx", "Reactive Utilities"],
	repeat: ["reactive-utilities/repeat.mdx", "Reactive Utilities"],
	runWithOwner: ["reactive-utilities/run-with-owner.mdx", "Reactive Utilities"],
	untrack: ["reactive-utilities/untrack.mdx", "Reactive Utilities"],

	createReaction: [
		"secondary-primitives/create-reaction.mdx",
		"Secondary Primitives",
	],
	createRenderEffect: [
		"secondary-primitives/create-render-effect.mdx",
		"Secondary Primitives",
	],
	createRoot: ["secondary-primitives/create-root.mdx", "Secondary Primitives"],
	createTrackedEffect: [
		"secondary-primitives/create-tracked-effect.mdx",
		"Secondary Primitives",
	],
	onCleanup: ["secondary-primitives/on-cleanup.mdx", "Secondary Primitives"],
	onSettled: ["secondary-primitives/on-settled.mdx", "Secondary Primitives"],
	resolve: ["secondary-primitives/resolve.mdx", "Secondary Primitives"],

	createProjection: [
		"store-utilities/create-projection.mdx",
		"Store Utilities",
	],
	createStore: ["store-utilities/create-store.mdx", "Store Utilities"],
	deep: ["store-utilities/deep.mdx", "Store Utilities"],
	merge: ["store-utilities/merge.mdx", "Store Utilities"],
	omit: ["store-utilities/omit.mdx", "Store Utilities"],
	reconcile: ["store-utilities/reconcile.mdx", "Store Utilities"],
	snapshot: ["store-utilities/snapshot.mdx", "Store Utilities"],
	storePath: ["store-utilities/store-path.mdx", "Store Utilities"],

	escape: ["rendering/escape.mdx", "Rendering"],
	hydrate: ["rendering/hydrate.mdx", "Rendering"],
	isDev: ["rendering/is-dev.mdx", "Rendering"],
	isServer: ["rendering/is-server.mdx", "Rendering"],
	render: ["rendering/render.mdx", "Rendering"],
	renderToStream: ["rendering/render-to-stream.mdx", "Rendering"],
	renderToString: ["rendering/render-to-string.mdx", "Rendering"],
	renderToStringAsync: ["rendering/render-to-string-async.mdx", "Rendering"],
	resolveSSRNode: ["rendering/resolve-ssr-node.mdx", "Rendering"],
	ssr: ["rendering/ssr.mdx", "Rendering"],
	ssrAttribute: ["rendering/ssr-attribute.mdx", "Rendering"],
	ssrClassList: ["rendering/ssr-class-list.mdx", "Rendering"],
	ssrElement: ["rendering/ssr-element.mdx", "Rendering"],
	ssrHydrationKey: ["rendering/ssr-hydration-key.mdx", "Rendering"],
	ssrStyle: ["rendering/ssr-style.mdx", "Rendering"],

	Accessor: ["types/accessor.mdx", "Types"],
	Component: ["types/component.mdx", "Types"],
	ComponentProps: ["types/component-props.mdx", "Types"],
	Context: ["types/context.mdx", "Types"],
	EffectFunction: ["types/effect-function.mdx", "Types"],
	EffectOptions: ["types/effect-options.mdx", "Types"],
	FlowComponent: ["types/flow-component.mdx", "Types"],
	FlowProps: ["types/flow-props.mdx", "Types"],
	JSX: ["types/jsx.mdx", "Types"],
	JSXElement: ["types/jsx-element.mdx", "Types"],
	MemoOptions: ["types/memo-options.mdx", "Types"],
	ParentComponent: ["types/parent-component.mdx", "Types"],
	ParentProps: ["types/parent-props.mdx", "Types"],
	Ref: ["types/ref.mdx", "Types"],
	Setter: ["types/setter.mdx", "Types"],
	Signal: ["types/signal.mdx", "Types"],
	SignalOptions: ["types/signal-options.mdx", "Types"],
	Store: ["types/store.mdx", "Types"],
	VoidComponent: ["types/void-component.mdx", "Types"],
	VoidProps: ["types/void-props.mdx", "Types"],
};

const SKIP_NAMES = new Set([
	"$DEVCOMP",
	"$PROXY",
	"$REFRESH",
	"$TRACK",
	"DEV",
	"SUPPORTS_PROXY",
	"clearSnapshots",
	"markSnapshotScope",
	"peekNextChildId",
	"releaseSnapshotScope",
	"setSnapshotCapture",
]);

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");

const args = parseArgs(process.argv.slice(2));
const sourceDir = path.resolve(args.source ?? DEFAULT_SOURCE);
const sourceRef = args["source-ref"] ?? DEFAULT_REF;
const outDir = path.resolve(repoRoot, args.out ?? DEFAULT_OUT);
const dryRun = Boolean(args["dry-run"]);
const skipFetch = Boolean(args["skip-fetch"]);

if (args.help) {
	printHelp();
	process.exit(0);
}

if (!skipFetch) {
	ensureSourceCheckout(sourceDir, sourceRef);
}

const sourceSha = git(["-C", sourceDir, "rev-parse", "HEAD"]).trim();
const program = createProgram(sourceDir);
const checker = program.getTypeChecker();
const entries = collectEntries(program, checker, sourceDir);
const files = buildOutputFiles(entries, {
	sourceDir,
	sourceRef,
	sourceSha,
});

if (dryRun) {
	printDryRun(files, entries, sourceSha);
} else {
	writeFiles(files);
	console.log(
		`Wrote ${files.length} reference file(s) to ${path.relative(repoRoot, outDir)}`
	);
	console.log(`Solid source SHA: ${sourceSha}`);
}

function parseArgs(rawArgs) {
	const parsed = {};
	for (let i = 0; i < rawArgs.length; i++) {
		const arg = rawArgs[i];
		if (!arg.startsWith("--")) {
			throw new Error(`Unexpected argument: ${arg}`);
		}
		const key = arg.slice(2);
		if (["dry-run", "skip-fetch", "help"].includes(key)) {
			parsed[key] = true;
			continue;
		}
		const next = rawArgs[++i];
		if (!next || next.startsWith("--")) {
			throw new Error(`Missing value for --${key}`);
		}
		parsed[key] = next;
	}
	return parsed;
}

function printHelp() {
	console.log(`Usage:
node scripts/extract-solid-v2-reference.mjs [options]

Options:
  --source-ref <ref>   Solid source ref to fetch. Defaults to "next".
  --source <path>      Local solidjs/solid checkout. Defaults to /tmp/solid-v2-source.
  --out <path>         Output directory. Defaults to src/routes/v2/reference.
  --dry-run            Print planned files without writing MDX.
  --skip-fetch         Use the current local checkout as-is.
  --help               Show this help.
`);
}

function ensureSourceCheckout(dir, ref) {
	if (!fs.existsSync(dir)) {
		git(["clone", "--filter=blob:none", "--sparse", REPO_URL, dir]);
	} else if (!fs.existsSync(path.join(dir, ".git"))) {
		throw new Error(`${dir} exists but is not a git checkout`);
	}

	git(["-C", dir, "sparse-checkout", "set", ...SPARSE_PATHS]);
	git(["-C", dir, "fetch", "origin", ref, "--depth=1"]);
	git(["-C", dir, "checkout", "--detach", "FETCH_HEAD"]);
}

function git(args) {
	return execFileSync("git", args, {
		encoding: "utf8",
		stdio: ["ignore", "pipe", "inherit"],
	});
}

function createProgram(root) {
	const options = {
		allowJs: false,
		allowSyntheticDefaultImports: true,
		esModuleInterop: true,
		jsx: ts.JsxEmit.Preserve,
		module: ts.ModuleKind.NodeNext,
		moduleResolution: ts.ModuleResolutionKind.NodeNext,
		noEmit: true,
		skipLibCheck: true,
		target: ts.ScriptTarget.ES2022,
		baseUrl: root,
		paths: {
			"solid-js": ["packages/solid/src/index.ts"],
			"@solidjs/signals": ["packages/solid-signals/src/index.ts"],
			"@solidjs/web": ["packages/solid-web/src/index.ts"],
		},
	};

	const rootNames = [
		...ENTRYPOINTS.map((entry) => path.join(root, entry.path)),
		...collectTsFiles(path.join(root, "packages/solid/src")),
		...collectTsFiles(path.join(root, "packages/solid-web/src")),
		...collectTsFiles(path.join(root, "packages/solid-signals/src")),
	];

	const host = ts.createCompilerHost(options);
	const originalResolve = ts.resolveModuleName;
	host.resolveModuleNames = (moduleNames, containingFile) =>
		moduleNames.map((moduleName) => {
			const alias = resolveAlias(root, moduleName);
			if (alias) {
				return {
					resolvedFileName: alias,
					extension: ts.Extension.Ts,
				};
			}

			if (moduleName.startsWith(".")) {
				const local = resolveLocalModule(containingFile, moduleName);
				if (local) {
					return {
						resolvedFileName: local,
						extension: ts.Extension.Ts,
					};
				}
			}

			return originalResolve(moduleName, containingFile, options, host)
				.resolvedModule;
		});

	return ts.createProgram([...new Set(rootNames)], options, host);
}

function resolveAlias(root, moduleName) {
	const aliases = {
		"solid-js": "packages/solid/src/index.ts",
		"@solidjs/signals": "packages/solid-signals/src/index.ts",
		"@solidjs/web": "packages/solid-web/src/index.ts",
	};
	return aliases[moduleName] ? path.join(root, aliases[moduleName]) : undefined;
}

function resolveLocalModule(containingFile, moduleName) {
	const base = path.resolve(path.dirname(containingFile), moduleName);
	const candidates = [
		base,
		base.replace(/\.js$/, ".ts"),
		`${base}.ts`,
		path.join(base, "index.ts"),
	];
	return candidates.find((candidate) => fs.existsSync(candidate));
}

function collectTsFiles(dir) {
	if (!fs.existsSync(dir)) return [];
	const files = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...collectTsFiles(fullPath));
		} else if (
			entry.isFile() &&
			fullPath.endsWith(".ts") &&
			!fullPath.endsWith(".d.ts")
		) {
			files.push(fullPath);
		}
	}
	return files;
}

function collectEntries(program, checker, root) {
	const entries = [];
	const byName = new Map();

	for (const entrypoint of ENTRYPOINTS) {
		const sourceFile = program.getSourceFile(path.join(root, entrypoint.path));
		if (!sourceFile) {
			throw new Error(`Entrypoint not found: ${entrypoint.path}`);
		}

		const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
		if (!moduleSymbol) continue;

		for (const exportedSymbol of checker.getExportsOfModule(moduleSymbol)) {
			const name = exportedSymbol.getName();
			if (shouldSkipName(name)) continue;

			const symbol = resolveSymbol(checker, exportedSymbol);
			const declarations = declarationList(symbol).filter((declaration) =>
				isSourceDeclaration(root, declaration)
			);
			if (!declarations.length) continue;

			const docs = getDocs(declarations);
			if (!docs.summary && !ROUTES[name]) continue;

			const primary = selectPrimaryDeclaration(declarations);
			const sourceFilePath = primary.getSourceFile().fileName;
			const sourcePath = relativePath(root, sourceFilePath);
			const line =
				primary
					.getSourceFile()
					.getLineAndCharacterOfPosition(primary.getStart()).line + 1;
			const kind = getKind(primary);

			const entry = {
				name,
				packageName: entrypoint.packageName,
				kind,
				sourcePath,
				line,
				docs,
				signature: getSignature(name, declarations, checker),
				route: routeFor(name),
				aliases: getExportAliases(name, exportedSymbol, symbol),
			};

			const existing = byName.get(name);
			if (existing) {
				mergeDuplicateEntry(existing, entry);
			} else {
				byName.set(name, entry);
				entries.push(entry);
			}
		}
	}

	return entries.sort(
		(a, b) =>
			a.route.path.localeCompare(b.route.path) || a.name.localeCompare(b.name)
	);
}

function mergeDuplicateEntry(existing, incoming) {
	if (!existing.docs.summary && incoming.docs.summary) {
		existing.kind = incoming.kind;
		existing.sourcePath = incoming.sourcePath;
		existing.line = incoming.line;
		existing.docs = incoming.docs;
		existing.signature = incoming.signature;
		existing.aliases = incoming.aliases;
	}
}

function shouldSkipName(name) {
	return SKIP_NAMES.has(name) || name.startsWith("$");
}

function resolveSymbol(checker, symbol) {
	if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) {
		try {
			return checker.getAliasedSymbol(symbol);
		} catch {
			return symbol;
		}
	}
	return symbol;
}

function declarationList(symbol) {
	return symbol.declarations ?? [];
}

function isSourceDeclaration(root, declaration) {
	const fileName = declaration.getSourceFile().fileName;
	return fileName.startsWith(path.join(root, "packages"));
}

function selectPrimaryDeclaration(declarations) {
	const withDocs = declarations.find(
		(declaration) => getDocs([declaration]).summary
	);
	return withDocs ?? declarations[0];
}

function getKind(declaration) {
	if (
		ts.isInterfaceDeclaration(declaration) ||
		ts.isTypeAliasDeclaration(declaration) ||
		ts.isTypeParameterDeclaration(declaration)
	) {
		return "type";
	}
	if (ts.isModuleDeclaration(declaration)) {
		return "namespace";
	}
	return "value";
}

function getDocs(declarations) {
	const result = {
		summary: "",
		params: [],
		returns: "",
		examples: [],
		deprecated: "",
		remarks: "",
		description: "",
	};

	for (const declaration of declarations) {
		const docs = declaration.jsDoc ?? [];
		for (const doc of docs) {
			const summary = normalizeMarkdown(renderComment(doc.comment));
			if (summary) result.summary = summary;

			for (const tag of doc.tags ?? []) {
				const tagName = tag.tagName.getText();
				const comment = normalizeMarkdown(renderComment(tag.comment));
				if (tagName === "param" && ts.isJSDocParameterTag(tag)) {
					result.params.push({
						name: tag.name.getText(),
						text: comment,
					});
				} else if (tagName === "returns" || tagName === "return") {
					result.returns = comment;
				} else if (tagName === "example") {
					if (comment) result.examples.push(comment);
				} else if (tagName === "deprecated") {
					result.deprecated = comment || "Deprecated.";
				} else if (tagName === "remarks") {
					result.remarks = comment;
				} else if (tagName === "description") {
					result.description = comment;
				}
			}
		}
	}

	return result;
}

function renderComment(comment) {
	if (!comment) return "";
	if (typeof comment === "string") return comment;
	return comment
		.map((part) => {
			if (typeof part.text === "string") return part.text;
			return part.getText?.() ?? "";
		})
		.join("");
}

function normalizeMarkdown(value) {
	return String(value)
		.replace(/\r\n/g, "\n")
		.replace(/^\s*\*\s?/gm, "")
		.trim();
}

function getSignature(name, declarations, checker) {
	const functionDeclarations = declarations.filter(ts.isFunctionDeclaration);
	if (functionDeclarations.length) {
		const overloads = functionDeclarations.filter(
			(declaration) => !declaration.body
		);
		const targets = overloads.length ? overloads : functionDeclarations;
		return targets
			.map((declaration) => cleanSignature(signatureFromNode(declaration)))
			.join("\n");
	}

	const classDeclaration = declarations.find(ts.isClassDeclaration);
	if (classDeclaration)
		return cleanSignature(signatureFromNode(classDeclaration));

	const interfaceDeclaration = declarations.find(ts.isInterfaceDeclaration);
	if (interfaceDeclaration)
		return cleanSignature(signatureFromNode(interfaceDeclaration));

	const typeAlias = declarations.find(ts.isTypeAliasDeclaration);
	if (typeAlias) return cleanSignature(signatureFromNode(typeAlias));

	const variableDeclaration = declarations.find(ts.isVariableDeclaration);
	if (variableDeclaration) {
		const type = checker.typeToString(
			checker.getTypeOfSymbolAtLocation(
				checker.getSymbolAtLocation(variableDeclaration.name) ??
					checker.getTypeAtLocation(variableDeclaration).symbol,
				variableDeclaration
			),
			variableDeclaration,
			ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType
		);
		return `const ${name}: ${type};`;
	}

	const enumDeclaration = declarations.find(ts.isEnumDeclaration);
	if (enumDeclaration)
		return cleanSignature(signatureFromNode(enumDeclaration));

	const primary = declarations[0];
	return cleanSignature(signatureFromNode(primary));
}

function signatureFromNode(node) {
	const sourceFile = node.getSourceFile();
	if (ts.isFunctionDeclaration(node) && node.body) {
		return `${sourceFile.text.slice(node.getStart(sourceFile), node.body.getStart(sourceFile)).trim()};`;
	}
	const text = node.getText(sourceFile);
	const withoutDocs = text.replace(/^\/\*\*[\s\S]*?\*\/\s*/g, "");
	return withoutDocs;
}

function cleanSignature(value) {
	return value
		.replace(/\r\n/g, "\n")
		.replace(/^export\s+/gm, "")
		.replace(/^declare\s+/gm, "")
		.replace(/\n{3,}/g, "\n\n")
		.trim()
		.replace(/;?$/, ";");
}

function getExportAliases(name, exportedSymbol, resolvedSymbol) {
	return exportedSymbol === resolvedSymbol ||
		exportedSymbol.getName() === resolvedSymbol.getName()
		? []
		: [resolvedSymbol.getName()].filter((alias) => alias !== name);
}

function routeFor(name) {
	const mapped = ROUTES[name];
	if (mapped) {
		return {
			path: mapped[0],
			category: mapped[1],
			mapped: true,
		};
	}
	return {
		path: `_unmapped/${slugify(name)}.mdx`,
		category: "Unmapped",
		mapped: false,
	};
}

function buildOutputFiles(entries, source) {
	const grouped = new Map();
	for (const entry of entries) {
		const routePath = entry.route.path;
		const current = grouped.get(routePath);
		if (!current) {
			grouped.set(routePath, [entry]);
		} else {
			current.push(entry);
		}
	}

	return [...grouped.entries()].map(([routePath, routeEntries]) => {
		const primary = routeEntries[0];
		return {
			routePath,
			fullPath: path.join(outDir, routePath),
			content: renderMdx(routeEntries, primary.route.category, source),
		};
	});
}

function renderMdx(entries, category, source) {
	const primary = entries[0];
	const description =
		escapeMdxText(primary.docs.summary.split("\n\n")[0]) ||
		`${primary.name} API reference.`;
	const title =
		entries.length === 1
			? primary.name
			: entries.map((entry) => entry.name).join(" / ");
	const frontmatter = [
		"---",
		`title: ${yamlString(title)}`,
		`category: ${yamlString(category)}`,
		'version: "2.0"',
		`description: ${yamlString(description)}`,
		`source_repo: "solidjs/solid"`,
		`source_ref: ${yamlString(source.sourceRef)}`,
		`source_sha: ${yamlString(source.sourceSha)}`,
		`source_path: ${yamlString(primary.sourcePath)}`,
		"---",
	].join("\n");

	const body = entries
		.map((entry) => renderEntry(entry, source))
		.join("\n\n---\n\n");
	return `${frontmatter}

{/* Generated by scripts/extract-solid-v2-reference.mjs. Edit the source JSDoc or route map, then regenerate. */}

${body}
`;
}

function renderEntry(entry, source) {
	const blocks = [];
	blocks.push(
		escapeMdxText(entry.docs.summary) || `${entry.name} API reference.`
	);

	if (entry.docs.deprecated) {
		blocks.push(`> Deprecated: ${escapeMdxText(entry.docs.deprecated)}`);
	}

	blocks.push(`## Import

\`\`\`ts
${entry.kind === "type" || entry.kind === "namespace" ? "import type" : "import"} { ${entry.name} } from "${entry.packageName}";
\`\`\``);

	blocks.push(`## Type signature

\`\`\`ts
${entry.signature}
\`\`\``);

	if (entry.docs.params.length) {
		blocks.push(`## Parameters

${entry.docs.params.map((param) => `### \`${param.name}\`\n\n${escapeMdxText(param.text) || "No description provided."}`).join("\n\n")}`);
	}

	if (entry.docs.returns) {
		blocks.push(`## Return value

${escapeMdxText(entry.docs.returns)}`);
	}

	if (entry.docs.remarks) {
		blocks.push(`## Remarks

${escapeMdxText(entry.docs.remarks)}`);
	}

	if (entry.docs.examples.length) {
		blocks.push(`## Examples

${entry.docs.examples.map(formatExample).join("\n\n")}`);
	}

	return blocks.join("\n\n");
}

function formatExample(example) {
	if (example.includes("```")) return example;
	return `\`\`\`ts
${example}
\`\`\``;
}

function escapeMdxText(value) {
	return splitFencedCode(value)
		.map((part) =>
			part.fence ? part.text : escapeAnglesOutsideInlineCode(part.text)
		)
		.join("");
}

function splitFencedCode(value) {
	const parts = [];
	const pattern = /```[\s\S]*?```/g;
	let lastIndex = 0;
	let match;
	while ((match = pattern.exec(value))) {
		if (match.index > lastIndex)
			parts.push({ fence: false, text: value.slice(lastIndex, match.index) });
		parts.push({ fence: true, text: match[0] });
		lastIndex = pattern.lastIndex;
	}
	if (lastIndex < value.length)
		parts.push({ fence: false, text: value.slice(lastIndex) });
	return parts;
}

function escapeAnglesOutsideInlineCode(value) {
	return value
		.split(/(`[^`]*`)/g)
		.map((part) =>
			part.startsWith("`")
				? part
				: part.replace(
						/<([A-Za-z][^>\n]*)>/g,
						(_match, inner) => `&lt;${inner}&gt;`
					)
		)
		.join("");
}

function writeFiles(files) {
	for (const file of files) {
		fs.mkdirSync(path.dirname(file.fullPath), { recursive: true });
		fs.writeFileSync(file.fullPath, file.content);
	}
}

function printDryRun(files, entries, sourceSha) {
	const mapped = entries.filter((entry) => entry.route.mapped).length;
	const unmapped = entries.length - mapped;
	console.log(`Solid source SHA: ${sourceSha}`);
	console.log(
		`Entries: ${entries.length} (${mapped} mapped, ${unmapped} unmapped)`
	);
	console.log(`Files: ${files.length}`);
	for (const file of files) {
		console.log(path.relative(repoRoot, file.fullPath));
	}
}

function relativePath(root, filePath) {
	return path.relative(root, filePath).split(path.sep).join("/");
}

function slugify(value) {
	return value
		.replace(/^\$/, "dollar-")
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/[^a-zA-Z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.toLowerCase();
}

function yamlString(value) {
	return JSON.stringify(value);
}
