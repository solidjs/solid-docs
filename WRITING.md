# Solid Docs Writing Guide

_Read the [Solid Docs Manifesto](https://github.com/solidjs/solid-docs-next#the-solid-docs-manifesto) first!_

_This is a draft! Help us improve it by making an issue or [reaching out directly](https://twitter.com/jutanium)._

This document explains how to write content for the new Solid docs.

We start broadly: how do we plan our content to most effectively teach the reader?

Then, we narrow in on the paragraph and sentence: how should the voice of the content _feel_, and how do we make sure the language is accessible?

Lastly, we discuss the specific terminology to use when referring to Solid concepts.

**Contents**

- [When do I need to follow this?](#when-do-i-need-to-follow-this)
- [Writing to teach](#writing-to-teach)
- [Content types](#content-types)
- [Tone and style](#tone-and-style)
- [Accessibility](#accessibility)
- [Terminology](#terminology)

## When do I need to follow this?

You can make a content PR _without_ following this guide. First draft PRs do not have to be mindful of tone, accessibility, or terminology. You do not need to be a great English speaker to contribute to the English docs. (Try to follow the methodology in [content types](#content-types) section so your PR matches our expectations for its content type!)

Feel free to grab an Issue and make a PR using rough paragraphs or bullet points. We'll review your PR and make the necessary edits so that the language is friendly, accessible, and accurate. That editing process must follow this guide.

On the flip side, not all of our existing content (and certainly not all new PRs), will follow these guidelines effectively. Another helpful way to contribute is by editing content to follow this writing guide.

If you'd like to contribute to this guide itself, feel free to submit an Issue or PR with the [governance](https://github.com/solidjs/solid-docs-next/labels/governance) tag.

## Writing to teach

The goal of documentation has often been to _describe_ the technology. If you can describe how everything works, someone can read what you wrote and gain the understanding they need to use the tech. This usually takes a lot of effort on the reader's part: we're all familiar with docs that are just _too_ technical for us to easily understand.

Instead, we wish to deliberately _teach_: create resources that are designed to most effectively promote learning. To do this, we incorporate - as best we can - an understanding of our users and how people learn.

<details>
  <summary>
  1. Have someone in mind when you write
  </summary>

We're writing for people, and different people come to the docs at different levels of experience and expectations. This doesn't mean that every piece of writing should serve every learning need - see our different [Content Types](#content-types). But it does mean that you can teach more effectively if you have an idea of who you're teaching and what works for them.

This can be difficult when you don't have a real person in mind (though we're very interested in establishing user testing for docs!). Before you write, establish what the reader knows beforehand and where you want them to end up. Make those expectations (and any prerequisites) clear to the reader.

You can certainly have multiple kinds of readers in mind for a specific piece of content: our new project tutorial even allows users to tell us what framework they come from so we can show additional relevant information.

But if you don't have anyone in mind, you might end up creating a resource that doesn't optimally meet the user need: for example, the [original tutorial](https://www.solidjs.com/tutorial/introduction_basics) doesn't work well for beginners who haven't used JSX before.

</details>

<details>
  <summary>
  2. Be mindful of the cost of learning
  </summary>

Learning a new concept isn't as easy as reading. It takes time, effort, and practice.

- You can lower the effort needed to learn a concept by splitting it into smaller points. This is useful on Concept pages, where we use bullet points to break down a difficult concept.

- You can facilitate the learning effort by providing opportunities to use the knowledge you've imparted. This is the principle behind tutorials, which guide the reader to put knowledge into practice, making it easier to remember. When writing a how-to guide or a Concept page, don't be afraid to repeat information later in the guide or ask the reader a rhetorical question ("What do you think is the problem here?") before answering it.

- When writing a guide on one topic, you'll run into opportunities to explain related concepts. There’s a balance between thoroughness and conciseness. Since new concepts are “expensive” to learn, ask yourself: is it worth explaining this here?

</details>

<details>
  <summary>
  3. Introduce, demonstrate, explain
  </summary>

This is a pattern for presenting a new idea, while reducing the chance of overwhelming the reader.

1. Briefly introduce the concept or technique
2. Demonstrate how it can be used (show an example)
3. Explain how the concept or idea works, to the level that the content type

(TODO: show an example)

</details>

<details>
  <summary>
  4. Learn the concept deeper than the level you teach it
  </summary>

If you're explaining something at a particular level, it helps to have an understanding at least a level deeper.

For example, if your goal is to explain _how_ to use `Show`, it helps to understand _why_ you should use `Show` over other approaches (like simple JSX ternaries). This knowledge can help you better introduce and motivate the concept.

Understanding the broader context can allow you to make connections that can then improve your writing.

</details>

<details>
  <summary>
  5. Learning is a journey; build towards one
  </summary>

The reader is always coming from somewhere, and there's always somewhere to go next.

- Tutorials should be sequential; each part of the tutorial should build off the previous part, and the second tutorial should build off the first one.
- Reference pages should link to concept explainers
- Prerequisite knowledge should be disclosed (at the top of a page, list what the reader needs to know, and link to the appropriate pages).
- At the end of a tutorial, provide next steps for learning
- Link to external information, like Ryan's streams, that can further learning beyond the docs

</details>

## Content types

We're using [Diataxis](https://diataxis.fr/) as a starting point for our docs. Their [needs](https://diataxis.fr/needs/) page is a must-read introduction!

The key insight of Diataxis is that documentation requires different _kinds_ of writing to meet the various needs of learners. A detailed API reference won't serve someone who's starting from scratch. A project-based beginner tutorial is great for onboarding new users holistically, but not great for "filling in the gaps" of someone's knowledge.

| Diataxis Content Type                               | What We Call Them                       | Focus                                                                                                               |
| --------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [Tutorials](https://diataxis.fr/tutorials/)         | (Project-based / interactive) Tutorials | To _introduce, educate_. Get the reader up and running and comfortable using Solid.                                 |
| [How-to Guides](https://diataxis.fr/how-to-guides/) | How-to Guides                           | To _guide, demonstrate_. Show how to accomplish a task or a set of tasks.                                           |
| [Reference](https://diataxis.fr/reference/)         | API Reference                           | To _describe, inform_. Provide a comprehensive description of Solid's API.                                          |
| [Explanation](https://diataxis.fr/explanation/)     | Concept Guides, Diving Deeper Guides    | To _clarify, discuss_. Allow the reader to understand the concepts at play; explain the behind-the-scenes of Solid. |

![image](https://user-images.githubusercontent.com/4033662/174461439-01f1c0f6-687d-4807-ac43-f61654144886.png)

## Tone and Style

_This section is especially looking for feedback_

Our first instinct for a tone guide was simply:

```
Friendly tone! Approachable is better than technical
```

This begs the question: what is a "friendly tone," exactly? It's hard to codify this feeling, but [Google's voice and tone](https://developers.google.com/style/tone) guide does a great job, and we defer to that guide.

> In your documents, aim for a voice and tone that's conversational, friendly, and respectful without being overly colloquial or frivolous; a voice that's casual and natural and approachable, not pedantic or pushy. Try to sound like a knowledgeable friend who understands what the developer wants to do.

> Don't try to write exactly the way you speak; you probably speak more colloquially and verbosely than you should write, at least for developer documentation. But aim for a conversational tone rather than a formal one.

> Don't try to be super-entertaining, but also don't aim for super-dry. Be human, let your personality show, and be memorable. But remember that the primary purpose of the document is to provide information to someone who's looking for it and may be in a hurry.

> Remember that many readers aren't fluent English speakers, many of them come from cultures different from yours, and your document might be translated into other languages.

An especially common mistake to look out for appears in the bullet-list there:

> - Using phrases like _simply, It's that simple, It's easy_, or _quickly_ in a procedure.

Don't _say_ that something is obvious or easy, because it might not be to the reader. Instead, work to _show_ that it is easy, and make it as easy as possible.

For style and grammar, we defer to rest of Google's [developer documentation style guide.](https://developers.google.com/style)

## Accessibility

_This section is especially looking for feedback_

### Readability

Learning Solid should be possible for everyone. To do that, we must make our language as readable as possible. Here are some examples of readers where the language we use can make a significant difference on their learning experience:

- A non-native English speaker. Complex English words and long sentences may serve as a barrier
- A beginner to web development or programming in general. Technical terms that are easy for others may serve as a barrier
- A reader who is stressed, tired, or on a time-crunch. Complex paragraphs and terms increase the effort and time for necessary for comprehension
- Readers with cognitive, language, or learning disabilities. Unnecessary idioms and jargon may present additional barriers

The W3C provides [standards for readability](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=313#readable) that we aim to meet. The first two standards are about switching languages. A quick summary of the others:

- [Unusual Words](https://www.w3.org/WAI/WCAG21/Understanding/unusual-words.html): Avoid figurative language and unnecessary technical terms. Provide additional "specialized information intended for non-specialist readers" to explain technical terms when they are necessary.

- [Abbreviations](https://www.w3.org/WAI/WCAG21/Understanding/abbreviations.html): Expand abbreviation when they first appear, and make sure the definition is always close at hand when using an abbreviation. (A [glossary system](https://github.com/solidjs/solid-docs-next/issues/59) would help with both this point and Unusual Words.)

- [Reading Level](https://www.w3.org/WAI/WCAG21/Understanding/reading-level.html): Text should be written be provided as clearly and simply as possible, and supplemental content should be provided if the text demands a high reading level. This is the most extensive of the standards, and we'll cover it below!

- [Pronunciation](https://www.w3.org/WAI/WCAG21/Understanding/pronunciation.html) Sometimes context isn't enough to understand a word; you need to know the right pronunciation of the word. This problem compounds if the sentence is being read aloud by a screenreader. Provide a reference to pronunciation if it is necessary to understand the meaning.

To keep reading level low:

- Where possible, avoid using compound sentences with many clauses. A period provides a natural stopping point for the reader to comprehend a point. Take avantage of this and split larger ideas into smaller sentences.
- Use simple English words. If you can think of a shorter word that expresses the same idea as a longer word, use the shorter word.
- Keep paragraphs short and focused. Each paragraph should have a specific goal and only include information that meets it. Break paragraphs often and don't be afraid to use bullet points. (If you come from a programming background, you can think about this like the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) but for paragraphs.)

Check your work using [Hemingway App](https://hemingwayapp.com/). It will show you if a sentence is too long (you don't have to change all yellow sentences, but it helps to change all red ones). It will suggest simpler alternatives to words and phrases, and encourage you to use active voice, which is generally shorter and easier to read.

We don't have a strict rule for grade level. Instead, we use grade 9 as a general guideline (Hemingway will tell you the reading level of a passage), using it as a soft test of clear writing.

- If an explanation is too wordy or complex, try to reduce the complexity and lower the reading level to grade 9.
- If you can't lower the reading level without compromising the explanation, consider adding supplemental information. This can be an aside with background information, an introductory summary to help set the stage for the in-depth explanation, or a diagram to make the explanation clearer.

### Web Accessibility

Aside from the words we choose, we need to optimize our content to make it accessible for people who use tools like screenreaders to use the web.

Much of that work must be done on a deeper technical infrastructure level, with ARIA and other techniques, but there are simple considerations that go a long way. [This guide](https://www.w3.org/WAI/tips/writing/) is our starting point. Some highlights to keep in mind for writing content:

- Use `<title>`s that are short, describe the page content, and distinguish the page from other tabs
- Use short headings that provide an outline of the content
- When using links, have meaningful link text that describes the link target
- Write informative alt text for diagrams

Google's [accessibility guide](https://developers.google.com/style/accessibility) serves as a more detailed reference point, providing both technical and textual solutions.

### Inclusive Language

Word choice can present an understanding barrier, but it can also be excluding. Incorporate inclusive language by default, and be willing to change language if new knowledge or standards arise indicating that it isn't inclusive.

Google's [inclusive language](https://developers.google.com/style/inclusive-documentation) guide provides an overview and examples for writing inclusive documentation.

## Terminology

This is a list of Solid-specific words and what they mean. In the second column, we put:

- terms that mean the same thing but shouldn't be used for the sake of consistency.
- terms that mean something different and are easy to confuse with the term at hand

These are technical terms; use them with the default assumption that the reader doesn't know what they mean.

| Terms to Use                      | Terms Not to Use                                                   | Definition                                                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Solid                             | SolidJS (unless outside the community and internal writings)       | A JavaScript framework made up of a library (providing primitives and UI utilities) and a compiler (allowing you to write in JSX). Its differentiating feature is its reactivity system. 
| scope                             | _not to be confused with:_ root, effect (specific kinds of scopes) | a body of a function (a chunk of code)                                                                                                                                    |
| tracking scope                    | tracking context, reactive context, reactive scope, reactive root  | a scope that, when run, Solid automatically tracks all read signals                                                                                                       |
| computation, reactive computation | _not to be confused with_: computed                                | a scope that automatically reruns when its dependencies change (it doesn't necessarily _have_ dependencies)                                                               |
| ownership, owns                   |                                                                    | a one-to-many relationship between computations. If a computation "owns" one or more other computations, all its owned computations are cleaned up when it is cleaned up. |
| root                              |                                                                    | a computation that has no owner. created by `createRoot`                                                                                                                  |
| reactivity                        |                                                                    | a system for writing expressions or behaviors that depend on certain values and execute when those values change.                                                         |
| reactive value                    | signal (don't use to describe a general reactive value)            | a value that can be tracked (includes signals, memos, properties of `props` and stores)                                                                                   |
| primitive                         | hook                                                               | a function that serves as a building block of reactivity or behavior. usually begins with `create` or `use`                                                               |
| core primitive                    | API function                                                       | a primitive provided by the Solid core library. This typically provides reactive behaviors but not necessarily ( `createContext` does not)                                |
| custom primitive                  | hook                                                               | a primitive created outside of the Solid core library; i.e., a function that provides a composable piece of functionality.                                                |
