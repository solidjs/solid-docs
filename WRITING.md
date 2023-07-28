# Solid Docs Writing Guide

## Introduction

Thank you for your interest in writing for Solid.
This writing guide is in-progress, so please be sure to check it often as we adjust things.
We welcome suggestions and feedback.

Bear in mind that the following is a general guideline, but we will use it as a framework to edit any incoming contributions.
This is to ensure to that Solid's documents remain consistent in tone, voice, structure, and conventions.

## Visual style

Solid wants to maintain a consistent brand across all of its documentation.
We want to present a consistent and professional face to our users and partners.
As such, we have several guidelines that will dictate how your contributions will look once published.
While it would be great if you followed these exactly — and our contributing editors would sure love you for it — we know that you'd probably prefer to focus on getting great Solid content ready to go.

So please try to follow this visual framework as best as you can to make the process as smooth as possible.
Of course, trends in documentation styling change over time, so we're fully aware that these guidelines will likely shift as we consider adopting new best practices.

### Layout

The bulk of your contributions will be the body copy.
But beyond just your written content, there are several other things to consider while working on your document.

#### Tables

Though not used all that often, tables are an important tool for several reasons.
The most important one is that they break up the text and offer clear information that the reader can glance through quickly.
No one wants to dig through word salad to find term definitions or data.

Solid uses Markdown for tables, so here's how to make one.
Start with a vertical line, also called a pipe: `|`.
Insert your first heading, end with another pipe, then write the next heading and end it with a pipe, and so on until you have your column headings.

One the line under the first column heading, insert at least three dashes: `---`.
This will create the separation between the heading and the content that follows below it.
Repeat this for all of your headings.
Note that three dashes is the minimum, but you can insert more if you want to make the table more legible in your editor.

The create the cells, start each new line with a pipe, then insert the content and surround it in spaces, end the cell with a pipe, and keep going until your row is done.

See below for an example of what this would look like in raw Markdown.

```
| Month | Day |
| --- | --- |
| January | 1 |
| February | 2 |
| March | 3 |
|April | 4 |
```

#### Asides

Asides serve as callout boxes in Solid's documentation.
They represent a section of the document that is related to the content surrounding the aside; they are contextual.
They work well with explaining how Solid differs from other popular frameworks, referring to other points in the documentation, or serving as a tangential note.
We ask that you use them sparingly.

To use an aside, you must first import the correct component.
To do so, use the following command in your terminal.
(Remember to be in the cloned Solid repo directory.)

`import { Aside } from ~/components/configurable/Aside`

Once you have the Aside component imported, simply follow the below example for how to add one to your document.

```
<Aside>
content here
</Aside>
```

### Code examples

Solid's documentation contains example code, such as you've seen here in this guide.
We use Markdown for creating inline code and code blocks.

If you want to call out a single command or a file path, surround the text with single back ticks: `.

Here's an example in raw Markdown:

```
`npm`
```

If, however, you need more than that, then a code block is more appropriate.
Start with three back ticks, ```, write your code, then close the block with three more back ticks.

Here's an example in raw Markdown:

```
```bash
npm install
``````

Code examples are vital to providing users with quick tips on how to use Solid's features, so be sure to keep the differences between inline code and code blocks in mind.

### Images

Good documentation takes advantage of images, such as screenshots and graphics, to elaborate on the written content.
The important distinction is that images should not introduce or explain something.
They are an accessory to the writing, not the main content itself.

To maintain some consistency, we would prefer that you stick to the PNG format so that the images scale well at all screen sizes and resolutions.
Please avoid using GIFs if at all possible because they interfere with accessibility.

Finally, we strongly request that you use alt text with your images.
This is very important for our accessibility initiatives.
We use the HTML format for alt text.

Here's an example of how to do that:

```
<img src="IMAGE.png" alt="alt text here" />
```

## Organization

Now that we've laid out how we'd like your contribution to look, we'd like to take a moment to discuss how we'd like to see it organized.

Please note that, for making commenting on GitHub easier, **each sentence gets its own line**.
Paragraphs should have two lines between them.

### Headings

Headings act as the primary means of document organization.
Solid uses Markdown, which means headings are defined by hashes `#` followed by a space.
For each additional hash, you go down one heading level.

Here's an example of a Heading 1 (H1) and a Heading 2 (H2) in raw Markdown.

```
# SolidJS documentation

## Introduction
```

We primarily uses Headings 1 through 3, though they go up to 6.
Note we rarely use Headings 5 and 6.

Below is a quick breakdown on the different headings.

```
H1: Title
H2: Main sections
H3: Subsections
H4: Minute details you would like to call out
H5/H6: Advanced concepts
```

### Lists

You will come across two types of lists in your contributions, ordered and unordered.
Here's a breakdown on when to use each one.

Ordered: This is for step-based, how-to content. You need an ordered list when the order or hierarchy is imporant.

Unordered: Unordered lists help break up content with non-hierarchical items. You will likely use them when writing exceptions and emphasizing important ideas.

In addition to these two types, you might need to use a nested list.
This is for when a listed item has a sub-part to it that is relevant to its content.

Finally, you may come across a point where you need to make a note on a listed item.
This would be an area where a nested point would not be appropriate.
These notes might link out to another part of the documentation or a piece of reference material; or, they may also inform the reader about a warning or a gotcha.
(Gotchas are unexpected and/or unreasonable outcomes that the reader should know about. An example is a command that is similar to the one you listed, but using it would cause some kind of issue.)

### Page linking

We would prefer you to keep page linking in mind while you're working on your contribution.
The following two points are what you should pay attention to:

1. Interlink when you refer to a topic that has its own published document. This makes it possible for the user to easily seek additional information.
2. Be descriptive with the linked text. Do not use "click here" or any variation therein, as this is not a best practice for accessibility.

Links are written in Markdown.
Here's an example of what that looks like:

```
Do: Check the [Solid homepage](https://www.solidjs.com)
Don't: Click [here](https://www.solidjs.com) to go to the Solid homepage.
```

## Voice and tone

So far, we've dealt with how your contributions should look and function.
As important as all of that is, the core part of your documents is the writing itself, so we want to discuss how we would like our documentation to read.

### Approachable

Modern documentation has shifted toward a less formal tone to great effect.
Good documents these days center on providing a friendly and approachable tone.
Solid would like to adopt this.
Of course, your contributions should still maintain a technical focus to provide the reader with the information that they're looking for.
We encourage you to pay attention to how [Google](https://developers.google.com/style/tone) defines a friendly tone.

> In your documents, aim for a voice and tone that's conversational, friendly, and respectful without being overly colloquial or frivolous; a voice that's casual and natural and approachable, not pedantic or pushy. Try to sound like a knowledgeable friend who understands what the developer wants to do.

Most readers want to feel a connection to the writing and oftentimes to the writer(s) themselves.
The old way of writing documentation — the dry, formal, and very rigid method — created a divide between the reader and writer.
We don't want that here.
We want our users to enjoy reading Solid's docs so that they retain the information they came here for.
This requires writing engaging content that is also approachable for most skill levels.

The tricky part for you is determining that baseline skill level.
Solid caters to a more technically advanced audience, the members of which are more likely to know what you might consider to be basic knowledge.
However, in the introductory documentation especially, we should be offering written work that is approachable even to beginners.
We'll discuss more what that looks like later, but just remember these two questions when considering your contribution's approachability.
Who is the document for?
What would I be looking for if I was coming to this document for the first time?

Please keep in mind, do not write like you are present with the user.

```
- Do: Visit Solid's homepage.
- Don't: We're going to visit Solid's homepage.
```

When writing steps in a how-to section, you should use an simplistic imperative tone. This means the sentence starts with a verb.

```
- Do: Download npm.
- Don't: You will/should download npm.
```

### Accessible

Accessibility has taken a front seat in most aspects of technology in recent years, including documentation.
Solid should be accessible to anyone who wishes to use it, meaning that your writing has to meet some basic standards in this regard. 

Some of accessibility comes down to visual style, as we discussed.
However, it goes hand-in-hand with inclusiveness (which we'll get to next), so there is some overlap between the two.
For now, we ask that you understand that Solid wants to ensure that everyone can read our documentation.
What does that look like?

The first step towards accessibility is ensuring that you use proper English grammar in your contributions.
This is especially helpful for those users who utilize screen readers.
Another way you can help the visually impaired is by keeping your paragraphs reasonably short.
A good rule of thumb is no more than four sentences, or four to five lines of text.

Shorter paragraphs help readers of all abilities, since walls of text can discourage in-depth reading and understanding.
You can once again practice empathy here.
What would you like to read?

As we discussed in the Organization section, ensuring a strong layout is key to accessible documentation.
We encourage you to remember that your contributions should be organized logically.
Headings that give a strong indicator of the section's topic, as well as descriptive hyperlinks, go a very long way in helping our readers navigate our docs.

### Inclusive

Great documentation strives to be as inclusive for as many people as possible.
That includes those from different backgrounds, such as varying countries and languages.
As Solid grows, so will its audience, and therefore we should work hard to ensure that our readers feel included in our docs.

What does inclusive language look like?

First, we want to focus on using plain, simple English.
That means avoiding the use of jargon wherever possible.
(We know that in more advanced documents, this becomes nearly impossible.)

In cases where jargon is necessary, be sure the document contains at least one brief description upon the first mention.
For example, if you want to use an acronym, spell it out first with the acronym in parentheses after.
From then on, you can use the acronym in that document.

Plain and simple English also entails avoiding contractions, as these are not always easily understood by those for whom English is not the first language.
We should also avoid idioms wherever possible; remember, not everyone will understand what they mean.

Secondly, inclusive language means remaining as gender-neutral as possible.
Instead of defaulting to one gender, use a gender-neutral word instead.
As mentioned previously, we want to use friendly, second-person language to help connect our readers with our documentation.
Doing so makes it fairly simple to avoid gendered words.
Use your own common sense to determine which word to use, but if you slip up, an editor should catch it.

Writing inclusively also entails avoiding ableist language.
That usually comes about in turns of phrase or certain idioms.
Alternatives to ableist words will go a long way to ensuring our documentation meets the needs of more people.

Similarly, we should not use divisive terms to get our point across.
That means steering clear of socially- and racially-charged language for concepts, such as "blacklist" or "first-class."

We have chosen to use American English in our documentation, so please remember that especially with spelling.

Despite us aiming for an informal tone, that does not mean that we want to get too lax in our language.
We should try to avoid too many references to a specific culture (e.g. American).
Solid has a large North American audience, but our readers are not exclusive to that region.
Please keep this in mind before you use a certain term or phrase.

When it comes to the topic of inclusion and inclusive language, empathy is critical.
Once again, constantly ask yourself throughout your writing process: Who is this document for?

For more on what inclusive language looks like, [Google once again has a great breakdown](https://developers.google.com/style/inclusive-documentation).

## Solid Terms

This is a list of Solid-specific words and what they mean. In the second column, we put:

- Terms that mean the same thing but shouldn't be used for the sake of consistency.
- Terms that mean something different and are easy to confuse with the term at hand

These are technical; use them with the default assumption that the reader doesn't know what they mean.

| Terms to use | Terms not to use | Definition |
| --- | --- | --- |
| Computation, reactive computation | *Not to be confused with*: computed | A scope that automatically reruns when its dependencies change (it doesn't necessarily _have_ dependencies). |
| Core primitive | API function | A primitive provided by the Solid core library; this typically provides reactive behaviors but not necessarily ( `createContext` does not). |
| Custom primitive | hook | A primitive created outside of the Solid core library; i.e., a function that provides a composable piece of functionality. |
| Ownership, owns | | A one-to-many relationship between computations; if a computation "owns" one or more other computations, all its owned computations are cleaned up when it is cleaned up. |
| Primitive | Hook | A function that serves as a building block of reactivity or behavior. usually begins with `create` or `use`. |
| Reactive value | Signal (don't use to describe a general reactive value) | A value that can be tracked (includes signals, memos, properties of `props` and stores). |
| Reactivity | | A system for writing expressions or behaviors that depend on certain values and execute when those values change. |
| Root | | A computation that has no owner. created by `createRoot`. |
| Scope | *Not to be confused with:* root, effect (specific kinds of scopes) | A body of a function (a chunk of code). |
| Solid | SolidJS (unless outside the community/internal writings) | A JavaScript framework made up of a library (providing primitives and UI utilities) and a compiler (allowing you to write in JSX). Its differentiating feature is its reactivity system. |
| Tracking scope | Tracking context, reactive context, reactive scope, reactive root | A scope that, when run, Solid automatically tracks all read signals |
