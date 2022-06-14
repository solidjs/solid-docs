# Solid Docs Writing Guide

This document explains how to write content for the new Solid docs.

We start broadly, with pedagogy: how do we plan our content to most effectively teach the reader?

Then, we narrow in on the paragraph and sentence: how should the voice of the content _feel_, and how do we make sure the language is accessible?

Lastly, we discuss the specific terminology to use when referring to Solid concepts.

**Contents**

- [When do I need to follow this?](#when-do-i-need-to-follow-this)
- [Our approach to teaching](#our-approach-to-teaching)
- [Content types](#content-types)
- [Tone](#tone)
- [Accessibility](#accessibility)
- [Terminology](#terminology)

## When do I need to follow this?

You can make a content PR _without_ following this guide. First draft PRs do not have to be mindful of tone, accessibility, or terminology. You do not need to be a great English speaker to contribute to the English docs. (Try to follow the methodology in the [pedagogy section](#pedagogy) though, to make sure your PR matches our expectations for its content type!)

If you've got an idea for how to explain something, feel free to grab an Issue and make a PR using rough paragraphs or bullet points. We'll review your PR and make the necessary edits so that the language is friendly, accessible, and accurate. That editing process must follow this guide.

On the flip side, not all of our existing content (and certainly not all new PRs), will follow these guidelines effectively. Another helpful way to contribute is by editing content to follow this writing guide.

If you'd like to contribute to this guide itself, feel free to submit an Issue or PR with the [governance](https://github.com/solidjs/solid-docs-next/labels/governance) tag.

## Our approach to teaching

- Tell a story
- Introduce, demonstrate,  explain

## Content types

## Tone

## Accessibility

## Terminology

| Terms to Use                      | Terms Not to Use                                                   | Definition                                                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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
| use (prefix)                      |                                                                    |

WE'RE WORKING ON THI

Writing Principles

- Friendly tone! Approachable > technical
  - Lowest common denominator vocabulary. The helpfulness of the docs depend on how accessible they are.
  - Reader-tests help with this! Test with “real” users; people who have the preexisting knowledge (or lack thereof) that you assume in your piece.
- Show, don’t tell
  - Don’t say that something is obvious or simple; show that it is with an example.
  - “Picture paints a thousand words” -> code examples & diagrams can accomplish a lot before you get to the explanatory paragraph.
- Establish the context; set expectations
  - Before you write, establish what the reader knows beforehand and where you want them to end up. Then as you write, make those expectations clear.
  - There’s a balance between thoroughness and conciseness. New concepts are “expensive” to learn. Ask yourself: is it worth explaining this here?

[Our Project Plan](https://docs.google.com/document/d/1Z25C3LhJF4KGbf1YvnmQo7dOzF5KjEVQtoE0ucy3BJs/edit?usp=sharing)
