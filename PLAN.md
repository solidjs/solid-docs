# Solid 2.0 Documentation Migration Plan

## How to Execute This Plan

**Aggressively analyze every documentation page against the RFC changes listed below before making edits.** Do not assume a page is unaffected — read it fully, cross-reference every code example, API mention, and behavioral description against the 2.0 RFCs. When in doubt, flag it rather than skipping it.

- **Be clear and descriptive.** Every edit should explain *what* changed and *why* it matters. Don't just swap API names — rewrite surrounding prose so the reader understands the new mental model.
- **Mark major reactivity shifts prominently.** Where 2.0 behavior fundamentally differs from 1.x (batching, split effects, no writes under scope, etc.), add a visible callout (e.g. `:::caution` or `:::note`) so readers cannot miss it.
- **Write new pages freely.** If a 2.0 concept needs its own page (e.g. `<Loading>`, `action()`, `flush()`), create the MDX file and add a corresponding entry in the relevant `data.json`.
- **Scope: core Solid docs only.** Router, Start, and Meta docs will be updated separately later.
- **Source of truth:** The RFC files live in `new-docs/documentation/solid-2.0/`. Always refer back to them.

---

## RFC Change Summary

Condensed reference of every RFC. Use this as a checklist when auditing each page.

### RFC 01 — Reactivity, Batching, and Effects
`new-docs/documentation/solid-2.0/01-reactivity-batching-effects.md`

| Change | Detail |
|--------|--------|
| Microtask batching by default | Setters no longer immediately update reads. Values become visible after the microtask flush or via `flush()`. |
| `flush()` replaces `batch()` | Synchronously applies all pending updates. Use sparingly. |
| Split effects (compute → apply) | `createEffect` takes two fns: a tracking fn (reads only) and an apply fn (side effects, returns cleanup). |
| No writes under owned scope | Writing signals inside effects/memos/component bodies warns in dev. Use event handlers, `onSettled`, or `{ pureWrite: true }`. |
| Strict top-level reactive reads | Reading signals/props at the top level of a component body warns in dev unless inside `createMemo`, `createEffect`, JSX, or `untrack`. |
| `onMount` → `onSettled` | Can return cleanup. Cannot create nested primitives. |
| `onCleanup` remains | For reactive lifecycle cleanup in computations. Not expected inside side effects. |
| Removals | `batch`, `onError`/`catchError`, `on` helper. |

### RFC 02 — Signals, Derived Primitives, Ownership, and Context
`new-docs/documentation/solid-2.0/02-signals-derived-ownership.md`

| Change | Detail |
|--------|--------|
| `createRoot` owned by parent | Roots inside an owned scope are disposed with the parent. Detach via `runWithOwner(null, ...)`. |
| Context as provider | `Context.Provider` removed. Use context directly: `<MyContext value={...}>`. |
| Function-form `createSignal(fn)` | Writable derived signal ("writable memo"). Replaces many `createComputed` uses. |
| Function-form `createStore(fn)` | Derived store from a mutation fn. |
| `createComputed` removed | Use split `createEffect`, `createSignal(fn)`, `createStore(fn)`, or `createMemo`. |

### RFC 03 — Control Flow
`new-docs/documentation/solid-2.0/03-control-flow.md`

| Change | Detail |
|--------|--------|
| `Index` removed | Use `<For keyed={false}>`. |
| `For` children receive accessors | Both item and index are accessors — call `item()` and `i()`. Supports `keyed`, `keyed={false}`, `keyed={(t) => t.id}`. |
| `Repeat` (new) | Count/range rendering without list diffing. |
| `Suspense` → `Loading` | Async boundary for initial readiness. |
| `ErrorBoundary` → `Errored` | Callback form receives `(err, reset)`. |
| `Show` / `Switch` / `Match` | Function children receive narrowed accessors. `Show` supports `keyed` prop. |

### RFC 04 — Stores
`new-docs/documentation/solid-2.0/04-stores.md`

| Change | Detail |
|--------|--------|
| Draft-first setters | Store setters receive a mutable draft (produce-style). Returning a value performs shallow diff. |
| `storePath()` compat helper | Opt-in adapter for 1.x path-style setters. |
| `mergeProps` → `merge` | `undefined` is a real value (overrides, not skipped). |
| `splitProps` → `omit` | `omit(props, "a", "b")`. |
| `createProjection` | Mutable derived store with reconciliation. Replaces `createSelector`. |
| `unwrap` → `snapshot` | Non-reactive plain value for serialization. |
| `deep()` helper | Deep observation of an entire store. |

### RFC 05 — Async Data
`new-docs/documentation/solid-2.0/05-async-data.md`

| Change | Detail |
|--------|--------|
| `createResource` removed | Async is first-class in computations. `createMemo(() => fetch(...))` suspends if unresolved. Wrap reads in `<Loading>`. |
| `isPending(fn)` | Stale-while-revalidating indicator. False during initial `Loading` fallback. |
| `latest(fn)` | Peek at in-flight values during transitions. |
| Built-in transitions | `startTransition`/`useTransition` removed. Multiple transitions can be in flight. |

### RFC 06 — Actions and Optimistic Updates
`new-docs/documentation/solid-2.0/06-actions-optimistic.md`

| Change | Detail |
|--------|--------|
| `action(fn)` | Generator/async-generator wrapper for mutations. |
| `refresh()` | Explicit recomputation of derived reads after mutations. |
| `createOptimistic` | Optimistic signal — reverts when transition completes. |
| `createOptimisticStore` | Optimistic store analogue. |

### RFC 07 — DOM
`new-docs/documentation/solid-2.0/07-dom.md`

| Change | Detail |
|--------|--------|
| Attributes over properties | HTML standards by default. Lowercase for built-ins. |
| `classList` removed | Merged into `class` — accepts string, object, or array. |
| Boolean attributes | Presence/absence: `muted={true}` adds, `muted={false}` removes. |
| `use:` directives removed | Use `ref` directive factories: `ref={tooltip(opts)}`. Compose with arrays. |
| `attr:`/`bool:`/`oncapture:` removed | Single attribute model. |
| Two-phase directive pattern | Owned setup (create primitives) → unowned apply (DOM writes). |

### Quick Rename/Removal Map

| 1.x | 2.0 |
|-----|-----|
| `batch` | removed — `flush()` when needed |
| `onMount` | `onSettled` |
| `onError` / `catchError` | effect `error` callback or `Errored` |
| `on` helper | removed |
| `createComputed` | `createEffect` (split), `createSignal(fn)`, `createStore(fn)`, or `createMemo` |
| `createResource` | async `createMemo` / `createStore(fn)` + `<Loading>` |
| `startTransition` / `useTransition` | removed — built-in transitions + `isPending` / `Loading` |
| `Suspense` | `Loading` |
| `ErrorBoundary` | `Errored` |
| `Index` | `<For keyed={false}>` |
| `mergeProps` | `merge` |
| `splitProps` | `omit` |
| `unwrap` | `snapshot` |
| `createSelector` | `createProjection` / `createStore(fn)` |
| `classList` | `class` (object/array) |
| `use:` directives | `ref` directive factories |
| `attr:` / `bool:` | removed |
| `oncapture:` | removed |
| `Context.Provider` | `<MyContext value={...}>` |
| `createMutable` | moved to `@solidjs/signals` |

---

## Phase 1: Concepts Pages

These are the teaching-focused pages. Each one needs a full read-through and rewrite where the 2.0 model differs.

### 1.1 Reactivity Foundations (CRITICAL — highest impact)

#### `src/routes/concepts/intro-to-reactivity.mdx`
- Rewrite the mental model to explain microtask batching: setters queue, reads return the old value until flush. **(RFC 01)**
- Remove any `batch()` mentions. **(RFC 01)**
- Explain strict top-level read rules — signal reads in component body must be inside a reactive scope or `untrack`. **(RFC 01)**
- Add a prominent warning callout about the batching change.

#### `src/routes/concepts/signals.mdx`
- Document that reads are batched: `setCount(1); count()` still returns 0 until flush. **(RFC 01)**
- Document function-form `createSignal(fn)` — writable derived signal. **(RFC 02)**
- Add warning about writes under owned scope + `{ pureWrite: true }` escape hatch. **(RFC 01)**
- Update all code examples.

#### `src/routes/concepts/derived-values/derived-signals.mdx`
- Introduce function-form `createSignal(fn)` as the primary writable derived pattern. **(RFC 02)**
- Update examples.

#### `src/routes/concepts/derived-values/memos.mdx`
- Note `createMemo` can return Promises — this is how async data works in 2.0. **(RFC 05)**
- Note `createComputed` is removed; mention replacements. **(RFC 02)**
- Add warning: async memos cause suspension — wrap reads in `<Loading>`.

#### `src/routes/concepts/effects.mdx`
> **Near-complete rewrite required.**
- Explain the split effect model: compute fn (reactive reads) → apply fn (side effects, returns cleanup). **(RFC 01)**
- Remove single-function effect examples or label them as 1.x-only.
- Document cleanup-via-return from the apply function (not `onCleanup` inside effects). **(RFC 01)**
- Add prominent warning: effects should not write signals. **(RFC 01)**
- Document `createTrackedEffect` for special single-callback cases. **(RFC 01)**
- Include before/after (1.x vs 2.0) examples.

#### `src/routes/concepts/stores.mdx`
> **Major rewrite required.**
- Draft-first setters as the default (produce-style). **(RFC 04)**
- `storePath()` as compat helper for 1.x path setters. **(RFC 04)**
- `snapshot()` replaces `unwrap()`. **(RFC 04)**
- `deep()` helper for deep observation. **(RFC 04)**
- Function-form `createStore(fn, initial)` for derived stores. **(RFC 02)**
- `createProjection` replacing `createSelector`. **(RFC 04)**

#### `src/routes/concepts/context.mdx`
- Replace `<ThemeContext.Provider value={...}>` with `<ThemeContext value={...}>`. **(RFC 02)**
- Remove all `.Provider` references.

#### `src/routes/concepts/refs.mdx`
- Remove `use:` directive documentation. **(RFC 07)**
- Document `ref` directive factories and array composition. **(RFC 07)**
- Document the two-phase directive pattern (owned setup → unowned apply). **(RFC 07)**

#### `src/routes/concepts/understanding-jsx.mdx`
- Update attribute handling: attributes over properties, lowercase for built-ins. **(RFC 07)**
- Replace `classList` examples with `class` object/array forms. **(RFC 07)**
- Remove `attr:`/`bool:` namespace references. **(RFC 07)**

### 1.2 Control Flow

#### `src/routes/concepts/control-flow/list-rendering.mdx`
> **Breaking changes — rewrite required.**
- Remove all `Index` documentation → convert to `<For keyed={false}>`. **(RFC 03)**
- Update `For` — children receive accessors: `item()` and `i()`. **(RFC 03)**
- Document `keyed`, `keyed={false}`, `keyed={(t) => t.id}`. **(RFC 03)**
- Document `Repeat` for count/range rendering. **(RFC 03)**
- Add prominent warning about the accessor change.

#### `src/routes/concepts/control-flow/conditional-rendering.mdx`
- Update `Show` function children to accessor pattern: `{(u) => <Profile user={u()} />}`. **(RFC 03)**
- Document `keyed` prop on `Show`. **(RFC 03)**
- Review `Switch`/`Match` examples.

#### `src/routes/concepts/control-flow/error-boundary.mdx`
- Rename `ErrorBoundary` → `Errored` throughout. **(RFC 03)**

#### `src/routes/concepts/control-flow/dynamic.mdx`
- Review for affected APIs. Likely minimal changes.

#### `src/routes/concepts/control-flow/portal.mdx`
- Review for affected APIs. Likely minimal changes.

### 1.3 Components

#### `src/routes/concepts/components/basics.mdx`
- Add warning about strict top-level reactive reads — no destructuring props. **(RFC 01)**
- Fix any examples that destructure props at the top level.

#### `src/routes/concepts/components/props.mdx`
- `mergeProps` → `merge` (note: `undefined` now overrides). **(RFC 04)**
- `splitProps` → `omit`. **(RFC 04)**
- Add warning about prop destructuring. **(RFC 01)**

#### `src/routes/concepts/components/event-handlers.mdx`
- Events remain camelCase — note this for clarity. **(RFC 07)**
- Remove any `oncapture:` references. **(RFC 07)**

#### `src/routes/concepts/components/class-style.mdx`
- Remove `classList` → document `class` with object/array forms. **(RFC 07)**

---

## Phase 2: Guides

#### `src/routes/guides/fetching-data.mdx`
> **Major rewrite — `createResource` is gone.**
- Replace all `createResource` patterns with async `createMemo` / `createStore(fn)`. **(RFC 05)**
- Replace `Suspense` → `Loading`. **(RFC 03/05)**
- Document `isPending(fn)` for stale-while-revalidating. **(RFC 05)**
- Document `latest(fn)`. **(RFC 05)**
- Document `action()` + `refresh()` for mutation/refetch patterns. **(RFC 06)**
- Document `createOptimistic` / `createOptimisticStore`. **(RFC 06)**
- Include before/after migration examples.

#### `src/routes/guides/state-management.mdx`
- Update store setters to draft-first. **(RFC 04)**
- Update `mergeProps`/`splitProps` → `merge`/`omit`. **(RFC 04)**
- Document function-form `createSignal(fn)` for writable derived state. **(RFC 02)**
- Remove any `batch` references. **(RFC 01)**

#### `src/routes/guides/complex-state-management.mdx`
- Draft-first store setters. **(RFC 04)**
- `createProjection` replacing `createSelector`. **(RFC 04)**
- `unwrap` → `snapshot`. **(RFC 04)**
- `deep()` for deep observation. **(RFC 04)**
- Derived stores via `createStore(fn)`. **(RFC 02)**

---

## Phase 3: API Reference Pages

Update signatures, descriptions, and examples. For removed APIs, rewrite the page to explain the removal and point to the replacement.

### 3.1 Basic Reactivity (`src/routes/reference/basic-reactivity/`)

| Page | Action |
|------|--------|
| `create-signal.mdx` | Add function-form overload. Document `{ pureWrite: true }`. Note batching. |
| `create-effect.mdx` | **Rewrite** — split effect signature. Cleanup via return. |
| `create-memo.mdx` | Document async support (Promise → suspends). Note it replaces `createResource` for reads. |
| `create-resource.mdx` | **Rewrite as removed.** Explain replacement: async `createMemo` + `<Loading>`. |

### 3.2 Reactive Utilities (`src/routes/reference/reactive-utilities/`)

| Page | Action |
|------|--------|
| `batch.mdx` | **Rewrite as removed.** Point to `flush()`. |
| `merge-props.mdx` | **Rewrite as renamed to `merge`.** Document `undefined` override. |
| `split-props.mdx` | **Rewrite as renamed to `omit`.** |
| `on-util.mdx` | **Rewrite as removed.** Split effects make it unnecessary. |
| `catch-error.mdx` | **Rewrite as removed.** Point to `Errored` / effect error callback. |
| `start-transition.mdx` | **Rewrite as removed.** Point to built-in transitions + `isPending`. |
| `use-transition.mdx` | **Rewrite as removed.** Point to built-in transitions + `isPending`. |
| `create-root.mdx` | Update: roots owned by parent. Document `runWithOwner(null, ...)`. |
| `run-with-owner.mdx` | Document `runWithOwner(null, ...)` for detachment. |
| `index-array.mdx` | Review — related to `Index` removal. |
| `map-array.mdx` | Review. |
| `untrack.mdx` | Add context about importance for strict top-level reads. |
| `get-owner.mdx` | Review — ownership model changed. |
| `from.mdx` | Review. |
| `observable.mdx` | Review. |

### 3.3 Components (`src/routes/reference/components/`)

| Page | Action |
|------|--------|
| `for.mdx` | **Rewrite** — accessor children, `keyed` prop, subsumes `Index`. |
| `index-component.mdx` | **Rewrite as removed.** Point to `<For keyed={false}>`. |
| `show.mdx` | Update accessor children, `keyed` prop. |
| `switch-and-match.mdx` | Minor updates. |
| `suspense.mdx` | **Rewrite as renamed to `Loading`.** |
| `suspense-list.mdx` | Review — likely removed or changed. |
| `error-boundary.mdx` | **Rewrite as renamed to `Errored`.** |
| `portal.mdx` | Review. |
| `dynamic.mdx` | Review. |
| `no-hydration.mdx` | Review. |

### 3.4 Component APIs (`src/routes/reference/component-apis/`)

| Page | Action |
|------|--------|
| `create-context.mdx` | Remove `.Provider` pattern. Context is the provider. |
| `use-context.mdx` | Update to match new provider syntax. |
| `children.mdx` | Review. |
| `lazy.mdx` | Review. |
| `create-unique-id.mdx` | Review. |

### 3.5 Lifecycle (`src/routes/reference/lifecycle/`)

| Page | Action |
|------|--------|
| `on-mount.mdx` | **Rewrite as replaced by `onSettled`.** Cleanup via return. Cannot create nested primitives. |
| `on-cleanup.mdx` | Update — still valid for computations, not expected inside side effects. |

### 3.6 JSX Attributes (`src/routes/reference/jsx-attributes/`)

| Page | Action |
|------|--------|
| `classlist.mdx` | **Rewrite as removed.** Point to `class` with object/array. |
| `attr.mdx` | **Rewrite as removed.** Standard attribute behavior is now default. |
| `bool.mdx` | **Rewrite as removed.** Standard boolean handling is now default. |
| `use.mdx` | **Rewrite as removed.** Point to `ref` directive factories. |
| `ref.mdx` | **Rewrite** — directive factory pattern, array composition, two-phase pattern. |
| `on_.mdx` | Review — `oncapture:` is removed. |
| `on.mdx` | Review. |
| `once.mdx` | Review. |
| `style.mdx` | Review. |
| `prop.mdx` | Review — attribute-first model may affect. |
| `innerhtml.mdx` | Review. |
| `textcontent.mdx` | Review. |

### 3.7 Store Utilities (`src/routes/reference/store-utilities/`)

| Page | Action |
|------|--------|
| `create-store.mdx` | **Rewrite** — draft-first setters + function-form overload. |
| `produce.mdx` | Update — produce is now the default setter pattern. |
| `reconcile.mdx` | Review — `createProjection` handles reconciliation. |
| `unwrap.mdx` | **Rewrite as renamed to `snapshot`.** |
| `create-mutable.mdx` | **Rewrite as removed/moved.** Moved to `@solidjs/signals`. |
| `modify-mutable.mdx` | Review — likely removed alongside `createMutable`. |

### 3.8 Secondary Primitives (`src/routes/reference/secondary-primitives/`)

| Page | Action |
|------|--------|
| `create-computed.mdx` | **Rewrite as removed.** Point to split `createEffect`, `createSignal(fn)`, `createMemo`. |
| `create-render-effect.mdx` | Update — split the same way as `createEffect`. |
| `create-selector.mdx` | **Rewrite as removed.** Point to `createProjection` / `createStore(fn)`. |
| `create-deferred.mdx` | **Rewrite as removed/moved.** |
| `create-reaction.mdx` | Review. |

---

## Phase 4: New Pages

Create these new MDX files and add entries in the corresponding `data.json`.

### New Reference Pages

| File to Create | Content | Source RFC |
|----------------|---------|-----------|
| `reference/reactive-utilities/flush.mdx` | `flush()` — synchronously apply pending updates | RFC 01 |
| `reference/reactive-utilities/is-pending.mdx` | `isPending(fn)` — stale-while-revalidating indicator | RFC 05 |
| `reference/reactive-utilities/latest.mdx` | `latest(fn)` — peek at in-flight values | RFC 05 |
| `reference/reactive-utilities/refresh.mdx` | `refresh()` — explicit recomputation of derived reads | RFC 06 |
| `reference/reactive-utilities/action.mdx` | `action(fn)` — generator mutation wrapper | RFC 06 |
| `reference/reactive-utilities/create-optimistic.mdx` | `createOptimistic` — optimistic signal | RFC 06 |
| `reference/reactive-utilities/create-optimistic-store.mdx` | `createOptimisticStore` — optimistic store | RFC 06 |
| `reference/reactive-utilities/merge.mdx` | `merge()` — replaces `mergeProps` | RFC 04 |
| `reference/reactive-utilities/omit.mdx` | `omit()` — replaces `splitProps` | RFC 04 |
| `reference/components/loading.mdx` | `<Loading>` — async boundary | RFC 03, 05 |
| `reference/components/errored.mdx` | `<Errored>` — error boundary | RFC 03 |
| `reference/components/repeat.mdx` | `<Repeat>` — count/range rendering | RFC 03 |
| `reference/lifecycle/on-settled.mdx` | `onSettled` — replaces `onMount` | RFC 01 |
| `reference/store-utilities/snapshot.mdx` | `snapshot(store)` — non-reactive plain value | RFC 04 |
| `reference/store-utilities/store-path.mdx` | `storePath()` — compat helper for path setters | RFC 04 |
| `reference/store-utilities/deep.mdx` | `deep(store)` — deep observation | RFC 04 |
| `reference/store-utilities/create-projection.mdx` | `createProjection` — derived store with reconciliation | RFC 04 |

### New Guide Page

| File to Create | Content |
|----------------|---------|
| `guides/migrating-to-v2.mdx` | Comprehensive migration guide for users coming from 1.x. Based on `MIGRATION.md`. Include the quick checklist, before/after examples for every major change, and links to the relevant concept/reference pages. |

---

## Phase 5: Navigation (`data.json` Updates)

Update these `data.json` files to reflect new, renamed, and removed pages:

- `src/routes/reference/reactive-utilities/data.json` — add `flush`, `is-pending`, `latest`, `refresh`, `action`, `create-optimistic`, `create-optimistic-store`, `merge`, `omit`; remove or mark `batch`, `on-util`, `catch-error`, `start-transition`, `use-transition`, `merge-props`, `split-props`
- `src/routes/reference/components/data.json` — add `loading`, `errored`, `repeat`; remove or mark `suspense`, `suspense-list`, `index-component`
- `src/routes/reference/lifecycle/data.json` — add `on-settled`; remove or mark `on-mount`
- `src/routes/reference/store-utilities/data.json` — add `snapshot`, `store-path`, `deep`, `create-projection`; remove or mark `unwrap`, `create-mutable`, `modify-mutable`
- `src/routes/reference/secondary-primitives/data.json` — remove or mark `create-computed`, `create-selector`, `create-deferred`
- `src/routes/reference/jsx-attributes/data.json` — remove or mark `classlist`, `attr`, `bool`, `use`
- `src/routes/guides/data.json` — add `migrating-to-v2`

---

## Phase 6: Final Review

- [ ] Full read-through of every modified and new page for consistency.
- [ ] Verify all code examples use correct 2.0 APIs.
- [ ] Verify no stale 1.x API references remain in core docs.
- [ ] Cross-reference the Quick Rename/Removal Map — every item addressed.
- [ ] Verify all callouts/warnings are in place for major behavioral changes.
- [ ] Check all internal links between pages resolve correctly.
