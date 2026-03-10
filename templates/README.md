# Reference page templates

Use these templates when rewriting or adding reference pages.
They are starter files, not strict copy-and-paste requirements.
Each page must still follow the correct archetype and the repo's writing rules.

## Available templates

- `function-api.mdx`
- `component-api.mdx`
- `jsx-attribute-syntax.mdx`
- `environment-rendering-utility.mdx`

## How to use them

- Pick the template that matches the page archetype in `REFERENCE_STANDARDIZATION_PHASE_1.md`.
- Replace placeholder text with the real API details.
- Remove any optional sections that do not apply.
- Keep one sentence per source line.
- Move displaced guide-style content to `CONTENT_RELOCATION_LOG.md`.

## Notes

- Do not force every page into the `function-api.mdx` layout.
- JSX attribute pages may use `## Behavior` because they document syntax semantics.
- Component pages should document individual fields under `## Parameters` instead of a generic `props` block.
