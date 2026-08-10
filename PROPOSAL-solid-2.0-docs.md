# Proposal: Solid 2.0 documentation structure

Solid 2.0 is a platform-wide change: `solid-js` 2.0, `@solidjs/web` 2.0, `@solidjs/router` 2.0, `@solidjs/meta` 1.0, and `vite-plugin-solid` 3.0 ship together and only work together. There is no SolidStart on this platform: SolidStart 2.0 is a Solid 1.x product and does not support Solid 2.0. Its role is taken by the `start` mode of the Vite plugin. This proposal restructures the docs site to match.

## The problem with the current structure

The site is organized as four products (Solid, Router, Start, Meta), each with its own version dropdown. That model worked when packages versioned independently. For 2.0 it breaks:

- **The versions are correlated, and the labels lie about it.** A reader on Solid v2 docs who clicks into the Router section lands on docs for a package that cannot exist in their app. Today, Meta's newest docs sit under a "v1" dropdown entry while "latest" is the old package, and Router has no new entry at all. Worst of all, SolidStart's "v2" sits beside Solid's "v2" in the nav while not supporting Solid 2.0 — the labels invite exactly the wrong conclusion.
- **The product boundaries dissolved.** `useHead` lives in `@solidjs/web`. Response helpers moved from the router to `@solidjs/web`. Single-flight mutations span the router and the plugin. Start is a plugin option. Per-package silos force readers to know which package owns a feature before they can find it.
- **The stack is router-agnostic.** TanStack Router + Query is a supported first-class path (the `fullstack-tanstack` template exists to prove it). Docs that bake `@solidjs/router` into the core learning path contradict the architecture.

## Proposed structure

Split into two sites, the way Vite handles major versions:

| Site | Contents | Status |
| --- | --- | --- |
| **v1.docs.solidjs.com** | The current site as it stands: core at `/`, Router 1, Meta 0.29, Start v1 + v2 (Start 2 runs on Solid 1, so it lives here) | Branched off and frozen in shape, maintained for fixes |
| **docs.solidjs.com** | One unified doc tree covering the Solid 2.0 platform, rebuilt from a clean starting point | The active effort |

Since everything is touched by Solid 2.0, branching the whole site beats threading version switches through every page. Each site links to the other from a banner. This is a one-time split for this transition, not a policy for every major version.

Package versions stop being a navigation concern entirely. Reference pages state "as of `@solidjs/router` 2.0" in frontmatter; the reader never picks versions per section.

### Search

Search is a forcing function for the split, not an afterthought. Today the site syncs one flat Orama Cloud index (`scripts/sync-orama.mjs`, documents of `content` / `path` / `section` / `title`) with no version facet — which is why searches surface Start 1 pages to Start 2 users, and why Solid 2 content would make results incoherent. Two sites mean two Orama projects: every result on docs.solidjs.com is a Solid 2.0 result, by construction. The v1 site keeps the existing index unchanged.

### The 2.0 tree

The sidebar keeps the existing Learn / Reference tab split.

#### Learn

| Section | Contents |
| --- | --- |
| **Overview** | What Solid 2.0 is, state of the beta, how the docs are organized |
| **Getting started** | Quick start (degit a template tier, run it, tour `App.tsx` / `Document.tsx`). Project shapes: `bare` / `basic` / `fullstack`, the deployment contract of each tier, the `ssr` flip |
| **Concepts** | The framework itself. No router, no server. Reactivity basics (signals, memos, effects). Async reactivity (`isPending`, `latest`, `flush`, `onSettled`, actions and `refresh`). Stores, projections, optimistic updates. Components and JSX control flow. Boundaries (`Loading`, `Errored`, `Reveal`). The rendering and SSR model |
| **Building apps** | The platform layer, router-neutral throughout. App structure (`App` / `Document` conventions, generated entries, `start` options). Styling and assets. Head and metadata (the Meta 1.0 components). Server functions. Sessions and auth. Typed environment variables and `server-only` / `client-only`. Middleware and API routes. Deployment (`handleRequest`, adapters, hosts) |
| **Routing** | The explicit choice point. An overview page documents the router seam: how a router mounts inside `App`, consumes `virtual:file-routes`, and participates in single-flight. Below it, two paths: **Solid Router** (the first-party default, full narrative docs written for 2.0) and **TanStack** (Router + Query integration guide, linking out for the router itself) |
| **Guides** | Task how-tos: testing (client and server postures), custom hosts (workers, Cloudflare), progressive enhancement and no-JS forms, and so on |
| **Migration** | One hub: from Solid 1.x (rename table, dropped APIs, the async model), from SolidStart (both the vinxi-era v1 and the released v2), from Router 0.x/1.x, from Meta 0.x |

#### Reference

Grouped by import specifier, generated from source where possible:

- `solid-js`
- `@solidjs/web`
- `@solidjs/router`
- `@solidjs/meta`
- `vite-plugin-solid` (full `Options` / `StartOptions` / `ServerFunctionsOptions` surface)
- `filesystem-routing`

### Route layout

No version prefix — the new site is Solid 2.0 at the root:

```
src/routes/
  (0)index.mdx
  (1)getting-started/
  (2)concepts/
  (3)building-apps/
  (4)routing/
      (0)overview.mdx
      (1)solid-router/
      (2)tanstack/
  (5)guides/
  (6)migration/
  reference/
      solid-js/
      solid-web/
      solid-router/
      solid-meta/
      vite-plugin-solid/
      filesystem-routing/
```

## Reasoning for the contentious calls

**Routing is its own section, not a Building Apps page.** It is the one place the reader makes a real choice, and both choices need room. `@solidjs/router` earns a full subtree (nested routes, preload, typed paths, actions). TanStack gets a real integration guide rather than a footnote. Every page in Building Apps is written to read correctly regardless of that choice.

**Meta and Start dissolve as products.** Meta 1.0 is eight components: one Building Apps page plus reference. Start's guides become Building Apps pages; its name survives in Getting Started ("start mode") and the migration hub.

**Reference splits `solid-js` from `@solidjs/web`.** The current v2 reference mixes them. Splitting by specifier matches what users import and where things now live (`useHead`, `clientOnly`, `redirect` / `respond` are all `@solidjs/web`).

**Getting started leads with the template tiers.** They are real, maintained, and each is a deployment contract. That beats an abstract install page, and the tier READMEs already model the tone the docs want.

## What moves, what gets written

| Content | Motion |
| --- | --- |
| 69 generated v2 reference pages | Re-sort into `reference/solid-js` and `reference/solid-web`; regenerate via `scripts/extract-solid-ref.mjs` |
| `solid-meta/v1/*` | Relocates nearly as-is into Building Apps + `reference/solid-meta` |
| `solid-start/v2` guides | Port into Building Apps, rewriting where the Start 2 API differs from start mode |
| Router 2.0 narrative + reference | **Net-new writing** |
| Concepts section | **Net-new writing** (adapted from v1 concepts against the 2.0 API) |
| Migration guides (beyond core) | **Net-new writing** (Router README on `next` has a migration section to seed from) |

The true size of the writing effort is Concepts, Routing, and Migration. Everything else is reorganization.

## Open questions

1. **Staging.** Where does the 2.0 site live while under construction — a preview deployment, or does the split happen up front with the new site carrying a beta banner? The v1 branch-off itself is cheap and can happen at any point.
2. **Redirects.** Existing deep links into today's site: which URLs redirect to the v1 subdomain versus mapping to their 2.0 equivalents? The middleware redirect layer already exists to implement whatever mapping is chosen.

## Suggested sequencing

1. **Foundations.** Writing-guide addendum for AI-assisted drafting (banned filler and marketing language, claims traceable to source) plus a CI tone lint. Reconcile the existing generated reference (a handful of missing pages, one stale page).
2. **Skeleton.** Branch the current site off for the v1 subdomain, then land the folder structure and nav config above from a clean starting point; move the content that relocates cleanly.
3. **Concepts.** The biggest user-facing hole: 2.0 beta users currently have API lookup but no way to learn the model.
4. **Routing + Migration.** Router 2.0 narrative docs, the TanStack integration guide, and the migration hub.
5. **Building Apps.** Port and rewrite the Start guides against start mode.
