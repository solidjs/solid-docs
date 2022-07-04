_Read the [Solid Docs Manifesto](https://github.com/solidjs/solid-docs-next#the-solid-docs-manifesto) first!_

# Contributing to the Solid Docs

We welcome contributions of any size and contributors of any skill level. As an open source project, we believe in giving back to our contributors. We are happy to help with guidance on PRs, technical writing, and turning a feature idea into a reality.

> **Tip for new contributors:**
> Take a look at [this GitHub guide](https://docs.github.com/en/get-started/quickstart/hello-world) to learn how to use Git and GitHub to contribute to open-source.

## Getting Started

Our `#docs` channel on [Discord](https://discord.com/invite/solidjs) is our home for general docs discussion. Feel free to introduce yourself there!

### Using GitHub Issues

- [Submit a new GitHub Issue](https://github.com/solidjs/solid-docs-next/issues/new/choose) to propose a change or addition to the docs.

- Bugs must be reported as Issues; it isn't enough to tell us on Discord!

- GitHub Issues allow us to assign tasks and prioritize them, thanks to our [GitHub project board](https://github.com/solidjs/solid-docs-next/projects/1). This is our task management tool.

- Because this project is new, most of our Issues represent new content that must be created. If you're interested in writing new content—or editing content to our standards—be sure to read the [Writing Guide](https://github.com/solidjs/solid-docs-next/blob/main/WRITING.md) before contributing.

### Do you need to know Solid to contribute?

In short, no! Here are ways you can help us if you don't yet know how to use Solid:

- Editing existing content for clarity
- Finding and fixing typos
- Making sure existing content and proposed PRs follow our [Writing Guide](https://github.com/solidjs/solid-docs-next/blob/main/WRITING.md)

If you don't _yet_ know how to use Solid, but you're learning, here's how you can help us along the way:

- "Testing" a tutorial, how-to guide, or concept page by using it to learn that topic
- Asking and answering questions in our #learn-solid channel on [Discord](https://github.com/solidjs/solid)

That said, if you want to contribute to open-source but aren't interested in Solid or documentation, we'd be happy to help you find an open-source project that suits you.

## Finding Something to Work On

To find something to help with, check out our [existing Issues](https://github.com/solidjs/solid-docs-next/issues). We're also happy to help you find something that suits you: ask a member of the Docs Team on [Discord](https://discord.com/invite/solidjs) to help get you situated.

### Issue Labels

You can sort by labels, which categorize the issues. These include:

- a label for each of the four [content types](https://github.com/solidjs/solid-docs-next/issues). For example, you know you prefer to work on deep concept explanations, you can choose the `concept` label.
- `new content` for when something needs to be written from scratch.
- `docs-migration` is used when content already exists but needs to be rewritten.
- `infrastructure` for technical changes; great if you're interested in diving into our codebase
- `advanced-experience` for issues that require advanced Solid knowledge to implement
- `no-experience-needed` for issues that you can help with even if you don't have Solid knowledge

## Submitting a Pull Request

> **Note**
> If you've never submitted a pull request on GitHub before, check out [this overview](https://opensource.guide/how-to-contribute/#opening-a-pull-request).

- Make sure your PR addresses an existing Issue.
- Group your work so that one PR solves one problem.
- Before you make a large PR, try to discuss it with the Docs Team on #docs. This will make sure we're on the same page and increase the chances of your PR getting merged.
- When you make a PR, you get a Netlify preview link. If you're not done with your changes but want that link to share with us, feel free to make a draft PR and add `[Draft]` to the title.

> **Note** Existing PRs and Issues need reviewing, triaging, and feedback, too! You can make valuable contributions by commenting, suggesting, testing, researching, brainstorming and generally helping in all areas on GitHub!

## Navigating the Codebase

Our site is build on [SolidStart](https://github.com/solidjs/solid-start). This is a framework that's still in development, so if you have any issues, check out the #docs or #solid-start channels on Discord. (In fact, the SolidStart team is working on documentation [within our repo](https://github.com/solidjs/solid-docs-next/tree/main/src/routes/start), too!)

### Folder structure

The action happens in the `src` folder. Of note:

- `src/components`: General components, like the sidebar navigation, footer, and Asides.
- `src/routes`: Content pages and components that are specific to them. Within are folders corresponding to our [four content types](https://github.com/solidjs/solid-docs-next/blob/main/WRITING.md#content-types):
  - `src/routes/tutorials`
  - `src/routes/concepts`
  - `src/routes/how-to-guides`
  - `src/routes/api-reference`
- `src/NAV_SECTIONS.ts`: This file determines the two sidebar navigation sections, **Guides** and **Reference**. **Guides** contains Tutorials and How-To Guides, and **Reference** contains Concept pages and API reference.

Every content page must have its own folder, even if it only has one page. For example, the Tracking concept page is one page, so it is found in an `index.md` file inside `routes/concepts/tracking`. The Getting Started with Solid tutorial has several pages, which are found inside `routes/tutorials/getting-started-with-solid`.

These folders will automatically generate routes; so, `routes/tutorials/getting-started-with-solid/installing-solid` will be shown at `https://docs.solidjs.com/tutorials/getting-started-with-solid/installing-solid`.

If a content page has its own custom components and code snippets, place these inside its content folder. See [the Getting Started with Solid folder](https://github.com/solidjs/solid-docs-next/tree/main/src/routes/tutorials/getting-started-with-solid) for an example.

> **Warning** There is also `start` folder in `src/routes`; it is a heavy work-in-progress managed by the SolidStart team and does not follow these rules.

### Adding New Content Pages

1. Choose one of the four folders inside `src/routes/`, corresponding to your page's [content type](https://github.com/solidjs/solid-docs-next/blob/main/WRITING.md#content-types)
2. Create a new folder inside that folder. The new folder's name should be the kebab case of your page's title: e.g., `getting-started-with-solid`.
3. Add `mdx` files for each subpage.

Feel free to submit a PR at this stage, and we can handle adding it to the nav. But if you'd like to do that:

4. Open `NAV_SECTIONS.ts`. This will allow you to add your new page to the nav. If your page is a tutorial or how-to guide, edit the `GUIDES_SECTIONS` object; if it's a concept page, edit the `REFERENCE_SECTIONS` object.
5. Find the object key corresponding to your content type. Then, add a new object to its `pages` array.
6. If your page doesn't have subpages, provide a `name` and a `link` property. (Search the file for "Tracking" for an example)
7. If your page does subpages, provide a `name` property and a `pages` array which contains your subpages. (Search the file for "Getting Started with Solid" for an example)
