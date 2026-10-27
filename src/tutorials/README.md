# Solid 2 tutorial curriculum

This course teaches Solid 2 to newcomers, one idea per lesson. Each lesson has an editable starter, a solved version, and a task explained in its MDX source. All previews run the site's pinned Solid 2 release.

| Section             | Lessons | Learning goal                                                                         |
| ------------------- | ------- | ------------------------------------------------------------------------------------- |
| Introduction        | 1–6     | JSX and components first, then signals, derived values, memos, writable derived state |
| Components          | 7–17    | Props, events, classes, control flow, lists, children, context, dynamic, portals      |
| Stores              | 18–19   | Nested state with drafts; projections                                                 |
| Async               | 20–26   | Async memos, `Loading`, pending updates, errors, streams, `Reveal`, `lazy`            |
| Mutations           | 27–30   | Actions, optimistic values and stores, `until`                                        |
| Effects and the DOM | 31–34   | Effects, lifetime and cleanup, ref factories, batching and `flush()`                  |

## Design

The order follows the concept pages: derive first, effects last. Every starter shows a problem in the preview (a stale value, a flicker, a dead click), and the lesson's API is what fixes it. Several starters trigger a development warning on purpose (`STRICT_READ_UNTRACKED`, `ASYNC_OUTSIDE_LOADING_BOUNDARY`, `SILENT_HOLD`); their solutions are warning-free.

`directory.json` is the canonical lesson order. `aliases.json` maps every former lesson id, both the solidjs.com ids and the ids of the first Solid 2 draft, to its lesson here. Old links redirect.

Use delayed local data in examples so an exercise never depends on a public API.

## Content and translations

English is the canonical Solid 2 curriculum. Other site locales show these same lessons with a visible English-content notice. Old translated Solid 1 explanations are not paired with new code. To add a translation, translate the current MDX and titles against the same canonical IDs and exercises.

A few starters (lists, portal, reveal, lazy, async errors) were adapted from the MIT-licensed `@solid.js/docs@1.0.56` tutorial distribution. Keep attribution in the repository's third-party notices.

## On the docs site

The first Solid 2 draft of these lessons came from devagrawal09/solid-site (`codex/solid-v2`). `src/routes/(_)tutorial/[[id]].tsx` renders them with the playground's `solid-repl`. Old solidjs.com lesson ids redirect through `aliases.json`.
