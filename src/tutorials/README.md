# Solid 2 tutorial curriculum

This course teaches the Solid 2 dataflow model to newcomers. Each lesson has an editable starter, a solved version, and a task explained in its MDX source. All previews run the site's pinned Solid 2 release.

| Stage                    | Learning goal                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------- |
| Getting started          | Render a small app and use the editor                                                  |
| Sources and derivations  | Model writable sources, cached answers, writable defaults, and microtask batching      |
| Rendering reactive state | Connect those answers to DOM bindings and owned conditional/list branches              |
| Composing components     | Preserve reactive props, share state factories, and provide context                    |
| Effects and lifetime     | Separate tracked computation from external effects and bind work to its owner          |
| Working with the DOM     | Handle events, classes, styles, refs, and ref directive factories                      |
| Structured state         | Read nested data and write drafts; bridge external snapshots through a derived store   |
| Async derivations        | Treat promises as answers; handle readiness, errors, pending updates, and reveal order |
| Async mutations          | Declare affected data, refresh authoritative reads, and implement optimistic rollback  |

## Changes from the published Solid 1 course

This is a redesigned sequence rather than an API rename pass. Automatic batching and writable derived state appear before effects. Shared state is introduced before context. Lifetime is taught before reusable DOM behavior. Async reads, readiness, pending updates, and mutations have separate exercises.

The old nested-signals store chapter is folded into the stores lesson. The spreads chapter is merged into forwarding props. The standalone render-error chapter is replaced by a complete async failure/retry exercise. New lessons cover writable derived state, ownership, actions, and optimistic rollback. Position-based lists use `For keyed={false}`. The course no longer teaches resource tuples, explicit transition starters, path setters, `produce`, `Index`, `onMount`, `on`, or `use:` directives.

`directory.json` is the canonical 42-lesson order. `aliases.json` maps all 40 former lesson IDs to canonical routes, preserving query strings such as `?solved`. Old links redirect; the directory and next/previous links use the new sequence.

## Content and translations

English is the canonical Solid 2 curriculum. Other site locales show these same lessons with a visible English-content notice. Old translated Solid 1 explanations are not paired with new code. To add a translation, translate the current MDX and titles against the same canonical IDs and exercises.

The original starter/solved files and supporting CSS were adapted from the MIT-licensed `@solid.js/docs@1.0.56` tutorial distribution. The explanations here were rewritten for Solid 2. Keep attribution in the repository's third-party notices.

Use delayed local data in teaching examples so the exercise does not depend on a public API's availability. Pending-state and mutation tests must test visible behavior, including rapid input changes and failed optimistic writes.

## On the docs site

These lessons came from devagrawal09/solid-site (`codex/solid-v2`). `src/routes/(_)tutorial/[[id]].tsx` renders them with the playground's `solid-repl`. Old solidjs.com lesson ids redirect through `aliases.json`.
