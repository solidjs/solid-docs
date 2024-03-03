# CONTRIBUTION GUIDE

Thank you for helping us make this project great and being a part of the Solid community!

We welcome contributions from anyone, regardless of your skill level.
We are happy to help with guidance on PRs, technical writing, and turning features into realities.

> **New to contributing?**
> Take a look at [﻿this GitHub guide](https://docs.github.com/en/get-started/start-your-journey/hello-world) to learn how to use Git and GitHub to contribute to open-source.

If you're new to Solid, we ask that you check out our [﻿Writing Guide](https://github.com/solidjs/solid-docs-next/blob/main/WRITING.md).

## Types of contributions

There are many ways to contribute to the Solid's documentation!

The Solid Docs website is built on Solid!
Maintaining it requires not only written content and Solid code maintenance, but it also needs to address accessibility (a11y), CSS, UI, and UX concerns.
We also aim to make our documentation available in several languages, so we need help translating the entire site.

You can help out by leaving review comments on [﻿PRs](https://github.com/solidjs/solid-docs-next/pulls)﻿ and adding ideas in existing GitHub [﻿issues ](https://github.com/solidjs/solid-docs-next/issues) and [﻿discussions](https://github.com/solidjs/solid-docs-next/discussions).

Every PR, especially translation PRs, will need reviewers.
Reviewing PRs and leaving comments, suggestions, or even saying "Looks good!" can be a great way to get started on contributing alongside our Docs team.
It's also a great way to learn more about Solid!

We encourage you to:

- File an issue
- Start a discussion
- Make a PR
- Look at our existing issues
- Review existing PRs

## File an issue

Issues are a great way to keep track of tasks, enhancements, and bugs for our projects. They're typically the first step to making a change.

After an issue has been considered by the community, we often reach out to community members to encourage them to submit PRs based on existing issues.

We encourage larger contributions to the docs after you participate in Issues and Discussions, as unsolicited material may not fit into our existing plans.

> While you're more than welcome to mention a bug that you've encountered on our ﻿Discord, we ask that you also report it as an issue!

### Writing an issue

Helpful issues generally include:

- Clear, descriptive titles
- Links to relevant pages/files
- Explanations as to why (or _for whom_) this is a problem
- _Option_: proposed solutions

### Examples of helpful new issues

- An explanation is confusing (with a reason why)
- a code example is wrong (with or without a proposed fix)
- accessibility (a11y) issues discovered
- missing content
- request for an example on how to implement a specific feature (e.g. responsive nav bar).

### Issue labels

We use labels as a way to organize and categorize our issues. Here are some common labels that you will see:

- `a11y` - related to anything accessibility.
- `bug` - when something isn't working.
- `good first issue` - a good place to start for newcomers
- `help wanted` - when we are looking for assistance on an issue
- `i18n` - anything to do with internationalization and translation

## Start a discussion

Discussions are a place within this repository where we can have open-ended conversations.
It's the perfect place for Q&A, sharing ideas, community engagement, and connecting with other members.

Feel free to start a [﻿new discussion](https://github.com/solidjs/solid-docs-next/discussions) on any topic related to our docs!

### Examples of helpful discussions

- Is a page in the right section of the docs?
- Notice the colors are too bold? Too muted?
- Is the site navigation clear and helpful?
- Any suggestions of content that you think could be helpful adding

## Make a PR (Pull Request)

> If you've never submitted a pull request on GitHub before, check out [﻿this overview on how to open a PR](https://opensource.guide/how-to-contribute/#opening-a-pull-request).

PRs are the heart of collaboration on GitHub.
When you open a pull request, you are putting forward your suggested changes, inviting us to review it, and requesting for these changes to be merged into our main branch.

Here's how to effectively contribute via a PR:

- **Understand the Scope**: Before creating a PR, ensure it addresses an existing issue. Remember to link your PR to the issue it solves for easy tracking and understanding.
- **Singular Focus**: Each PR should address a single issue or enhancement. Want to propose a larger change? Reach out to us on [﻿Discord](https://discord.com/invite/solidjs) and let's discuss the best way forward!
- **Drafts for Early Feedback**: If you're seeking early feedback but aren't quite finished with your changes, consider creating a draft PR. Simply prefix your PR title with `**[Draft]**`. This way, you can get input on your work-in-progress.
- **Quality over Quantity**: Strive for the quality of your contribution rather than the quantity. A well-thought-out, cleanly coded, and thoroughly tested PR is much more valuable than a hastily done large one.
  Contributing via PRs not only enhances the project, but also allows you to be a part of the active community, sharing ideas, learning, and growing with the project.

> Existing PRs and Issues need reviewing, triaging, and feedback, too! You can make valuable contributions by commenting, suggesting, testing, researching, brainstorming and generally helping in all areas!

### Writing a PR

> Need help making a PR? [﻿Join us on Discord](https://discord.com/invite/solidjs), we'll be more than happy to help you out!

Contributions to the documentation site are made by editing the docs repository.
You can do this directly on GitHub.com or by creating a copy of the repository locally, making your changes there, and contributing back to our repository.

#### Examples of helpful PRs

- PRs addressing an existing fix.
- Unsolicited PRs addressing typos, broken links, and other minor problems.
- Translating an entry.

### Edit this page via GitHub

Every page on [﻿docs.solidjs.com](https://docs.solidjs.com/)﻿ has an **Edit this page** link at the bottom.
You can click on that button to edit the source code for that page in **GitHub**.

After you make your changes, click **Commit changes**.
This will automatically create a [﻿fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks)﻿ of the docs in your GitHub account with the changes.

Once you have committed your edits within your fork, follow the prompts to create a **pull request** and submit your changes for review.

Every pull request needs to be reviewed by our contributors and approved by a maintainer.

### Translating

Though it is not a hard requirement, we'd deeply appreciate if you could recommend a native speaker to review your newly added translations. This ensures translations can also adhere to our review-based system for Pull Requests.

#### Adding support to a new language

1. Create a dictionary file in `src/i18n/dictionaries`. The name should follow our locale convention.

   - language (ISO 639-1 - set 1): https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes

- country code (ISO 3166-1 alpha-2): https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

- E.g.: Canadian French would be: `fr-ca`

2. Add it to the barrel file: `src/i18n/dictionaries/index.ts`. So it will be identified by the routing system.

3. Add the important UI translations.

> [!TIP]
> To save time, you can use chatGPT to translate the the `default.ts` dictionary to the language and adjust based on context.

#### Adding translations to a supported language

To translate a new entry to an existing language, go to `src/routes/{locale}` and add the entry following the exact same structure as the default.

> [!NOTE]  
> We can't accept half translated entries because there is not a way of tracking if an entry is not fully translated. Please, make sure you have the time to do the whole entry in your PR.

### Open a PR

Once you have made your changes using your preferred method, you're ready to create a 'pull request'.

This will let the Solid docs team know you have some changes you would like to propose.
At this point, we can give you feedback and possibly request changes.

[﻿Read more about making a pull request in GitHub's docs.](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project#making-a-pull-request)

Please include a clear title.
The description will have some pre-filled questions that we would like you to answer.

Every pull request generates a preview of the site, including your proposed changes, using **Netlify** for anyone to see.

Use the **Deploy Preview** link in your pull request to review and share your changes.

The docs site will be automatically updated whenever pull requests are merged.

## Helpful information

### Forks

On GitHub, you will need a 'fork' of this repository to work on.
This is your own copy of the code base where you can make changes. You can read more about forks in [GitHub's documentation](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)﻿.

Not sure how to get started with GitHub, forks, pull requests, or want a refresher?
You can watch this video series: [﻿How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

#### Creating a fork

To create your copy, click the `Fork` button at the top right of any page in this repository.

#### Maintaining a fork

When you first create your fork, it will be an exact copy of this repository.
Over time, our docs will change as they are updated, but your fork won’t automatically stay up-to-date.
Here are some ways to keep your fork in sync with this repo:

##### Update through GitHub UI

1. Navigate to your fork on GitHub
2. Click `Sync fork` and then `Update branch`

##### Update from your command line

In the terminal on your computer:

1. Make sure you're on the main branch and then run `git checkout main`
2. Fetch and merge the updates: `git pull upstream main`
3. Push the updates back to your fork on GitHub: `git push origin main`

##### Using the GitHub app

1. Go to the [﻿"pull" GitHub app page](https://github.com/apps/pull)
2. Click `Install`
3. Follow the instructions to select

## Next Steps:

- [﻿Read the docs](https://docs.solidjs.com)
- [﻿Fork the docs](https://github.com/solidjs/solid-docs-next/fork)
- [﻿Raise an issue](https://github.com/solidjs/solid-docs-next/issues/new)
- [﻿Discuss the docs](https://discord.com/invite/solidjs)
