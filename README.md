<p>
  <img src="https://assets.solidjs.com/banner?project=Solid%20Documentation&type=core" alt="Solid Documentation" />
</p>


Welcome to Solid's documentation!

This is the repo for [﻿docs.solidjs.com](https://docs.solidjs.com/). This repo
contains all the source code that we use to build our docs.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/solidjs/solid-docs-next)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/github/solidjs/solid-docs-next/)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/solidjs/solid-docs-next)

## What is Solid?

Solid is a JavaScript framework used for building high-performance
user-interfaces. Using a reactive approach and component-based architecture, we
want to empower developers in creating efficient and scalable web applications.

## Thank you for being here!

You can help make our docs better for the community! Your feedback is welcomed.
In addition, any editing, translating, designing, and developing skills are
welcomed. We are grateful to welcome you into our community!

If you want to see how you can contribute, check out our
[﻿How You Can Help](#how-you-can-help) section.

## Chat with us

You can learn more about Solid, get support, and meet other devs and
contributors in our [﻿Discord community](https://discord.com/invite/solidjs).

## Raise an issue

Have you noticed something is missing, confusing, or is wrong in our
documentation?

Check to see if it has
[﻿already been mentioned ](https://github.com/solidjs/solid-docs-next/issues)
and, if not,
[﻿create an issue](https://github.com/solidjs/solid-docs-next/issues/new/choose)
to bring it to our attention!

## Share an idea

Do you think something could be better? Have an idea you feel could make the
docs better?

Discussion threads are where you can offer feedback on things that might not be
problems that need addressing, but are ideas to be explored.

Join us in the
[﻿Discussions section](https://github.com/solidjs/solid-docs-next/discussions/280)
where we can brainstorm these ideas, ask questions, and share goals!

## Suggest a fix or contribute

Have you found a typo, broken link, or another item with an obvious quick fix?

If you can see what the problem is, and you know how to fix it, you can make a
PR (pull request) with the change and contribute to the docs repo yourself.

If you're looking to make a larger contribution, please see our
[﻿CONTRIBUTING.md](https://github.com/solidjs/solid-docs-next/blob/main/CONTRIBUTING.md)
first!

## Running the Site Locally

At the moment, we recommend running the site locally through either
[﻿CodeSandbox](https://codesandbox.io/p/github/solidjs/solid-docs-next/),
[﻿Gitpod](https://gitpod.io/#https://github.com/solidjs/solid-docs-next), or
[﻿StackBlitz](https://stackblitz.com/github/solidjs/solid-docs-next). These are
the quickest and easiest way to browse and edit the project files and run the
site locally.

The app uses [pnpm](https://pnpm.io) as the package manager and it runs on Node.js `v18+`.

Install dependencies:

```sh
pnpm i
```

And run the local dev server:

```sh
pnpm dev
```

This will start your the app at [localhost:3000](http://localhost:3000) or the next available port.

### Collections and virtual modules

The builds an [Astro](https://docs.astro.build/en/guides/content-collections/) inspired collection navigation, it will bring all routes and generate a couple of files at `/.solid`.
These files are exposed to your app via [Vite virtual modules](https://vitejs.dev/guide/api-plugin#virtual-modules-convention). This task is perform via our `sync` script (`pnpm sync`), ran before every build.

If changes are made to the navigation (new entry, or repositioning entry), it is necessary to restart the server for changes to take effect.
