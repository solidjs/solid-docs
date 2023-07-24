# Solid Docs Writing Guide

## Introduction

Thank you for your interest in writing for Solid.
This writing guide is in-progress, so please be sure to check it often as we adjust things.
We welcome suggestions and feedback.

Bear in mind that the following guide is a general guideline, but we will use it as a framework to edit any incoming contributions.
This is to ensure to that Solid's documents remain consistent in tone, voice, structure, and conventions.

## Visual style

Solid wants to maintain a consistent brand across all of its documentation.
As such, we have several guidelines that will dictate how your contributions will look once published.
While it would be great if you followed these exactly — and our contributing editors would sure love you for it — we know that you'd probably prefer to focus on getting great Solid content ready to go.
So, please try to follow this visual framework as best as you can to make the process as smooth as possible.

All that said, visual styling is very important for a product like Solid.
We want to present a consistent and professional face to our users and partners.

Of course, trends in documentation styling change over time, so we're fully aware that these guidelines will likely shift as we consider adopting new best practices.

### Layout

### Code usage examples

### Images

## Organization

### Headings

### Lists

### Tool tips

### Page linking

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

### Accessible

Accessibility has taken a front seat in most aspects of technology in recent years, including documentation.
Solid should be accessible to anyone who wishes to use it, meaning that your writing has to meet some basic standards in this regard. 

Some of accessibility comes down to visual style, as we discussed.
However, it goes hand-in-hand with inclusiveness (which we'll get to next), so there is some overlap between the two.
For now, we ask that you understand that Solid wants to ensure that everyone can read our documentation. What does that look like?

The first step towards accessibility is ensuring that you use proper English grammar in your contributions.
This is especially helpful for those users who utilize screen readers.
Another way you can help the visually impaired is by keeping your paragraphs reasonably short.
A good rule of thumb is no more than four sentences, or four to five lines of text.
Shorter paragraphs help readers of all abilities, since walls of text can discourage in-depth reading and understanding.
You can once again practice empathy here.
What would you like to read?

As we discussed in the Organization section, ensuring a strong layout is key to accessible documentation.
We encourage you to remember that your contributions should be organized logically.
Headings that give a strong indicator of the section's topic as well as descriptive hyperlinks go a very long way in helping our readers navigate our docs.

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

Secondly, inclusive language means remaining as gender-neutral as possible.
Instead of defaulting to one gender, use a gender-neutral word instead.
As mentioned previously, we want to use second-person language to help connect our readers with our documentation.
Doing so makes it fairly simple to avoid gendered words.
Use your own common sense to determine which word to use, but if you slip up, an editor should catch it.

Writing inclusively also entails avoiding ableist language.
That usually comes about in turns of phrase or certain idioms.
Alternatives to ableist words will go a long way to ensuring our documentation meets the needs of more people.
Similarly, we should not use divisive terms to get our point across.
That means steering clear of socially- and racially-charged language for concepts, such as "blacklist" or "first-class."

We have chosen to use American English in our documentation, so please remember that especially with spelling.

Despite us aiming for an informal tone in American English, that does not mean that we want to get too lax in our language.
We should try to avoid too many references to a specific culture (e.g. American).
Solid has a large North American audience, but our readers are not exclusive to that region.
Please keep this in mind before you use a certain term or phrase.

When it comes to the topic of the inclusion and inclusive language, empathy is critical.
Once again, constantly ask yourself throughout your writing process: Who is this document for?

For more on what inclusive language looks like, [Google once again has a great breakdown](https://developers.google.com/style/inclusive-documentation).

### Solid Terms

This is a list of Solid-specific words and what they mean. In the second column, we put:

- terms that mean the same thing but shouldn't be used for the sake of consistency.
- terms that mean something different and are easy to confuse with the term at hand

These are technical terms; use them with the default assumption that the reader doesn't know what they mean.

| Terms to Use                      | Terms Not to Use                                                   | Definition                                                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Solid                             | SolidJS (unless outside the community/internal writings)       | A JavaScript framework made up of a library (providing primitives and UI utilities) and a compiler (allowing you to write in JSX). Its differentiating feature is its reactivity system. 
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
